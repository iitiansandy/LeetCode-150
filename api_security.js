const checkEmailOrPhoneExist = (req, res, next) => {
  const { email, phone } = req.body;
  if (!email && !phone) {
    return next(
      new ErrorHandlers(
        ERROR_CODES.CUSTOM_ERROR.statusCode,
        "Phone or Email is required field",
        "auth"
      )
    );
  }
};

function validateApiToken(req, res, next) {
  console.log("Validating API token...");
  // const clientToken = req.get("x-api-auth");
  const clientToken = req.header("x-api-auth");
  console.log("clientToken:", clientToken);
  const timeWindow = Math.floor(Date.now() / (1000 * 60 * 10)); // 10-min window
  const expectedToken = crypto.createHash("sha256").update("SHARED_SECRET" + timeWindow).digest("hex");
  console.log("expectedToken:", expectedToken);
  console.log(clientToken === expectedToken);
  if (clientToken !== expectedToken) {
    return res.status(403).json({ message: "Invalid request" });
  }

  next();
}


function verifyOrigin(req, res, next) {
  const allowedOrigin = "https://www.bhimagold.com";
  const origin = req.get("origin");
  const userAgent = req.get("user-agent") || "";
  // 1. Block if Origin header is missing or invalid
  if (!origin || origin !== allowedOrigin) {
    return res.status(403).json({ message: "Forbidden: Invalid request" });
  }
  // 2. Block if request comes from common bots or tools
  const disallowedAgents = /(postman|curl|wget|http-client|insomnia|bot)/i;
  if (disallowedAgents.test(userAgent)) {
    return res.status(403).json({ message: "Forbidden: Suspicious client detected" });
  }
  next();
}


router.post("/authentication", verifyOrigin, validateApiToken, async (req, res, next) => {
  try {
    let {recaptchaToken, email, phone} = req.body;

      if (!recaptchaToken) {
        return next(
          new ErrorHandlers(
            ERROR_CODES.CUSTOM_ERROR.statusCode,
            "recaptchaToken is required field",
            "auth"
          )
        );
      }

      const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Set this in your .env file

      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: secretKey,
            response: recaptchaToken,
          },
        }
      );

      const { success, score, action } = response.data;
      console.log("Recaptcha response:", success, score, action);

      if (!success || score < 0.5) {
        return res.status(403).json({ message: "Bot detection failed" });
      }

    await checkEmailOrPhoneExist(req, res, next);

    let plainPhoneNumber;
    if (phone) {
      plainPhoneNumber = await decryptPassword(phone);
    }

    const orConditions = [];
    if (plainPhoneNumber) orConditions.push({ phone: plainPhoneNumber });
    if (email) orConditions.push({ email: email });

    let user = null;

    if (orConditions.length > 0) {
      user = await userService.findOne({ $or: orConditions });
    }

    // Create if no match found
    if (!user) {
      user = await userService.create({
        phone: plainPhoneNumber,
        email,
      });
    } else {
      // Optionally update missing fields (e.g., if email wasn't previously saved)
      const updateFields = {};
      if (!user.phone && plainPhoneNumber) updateFields.phone = plainPhoneNumber;
      if (!user.email && email) updateFields.email = email;

      if (Object.keys(updateFields).length > 0) {
        await userService.updateUser({ _id: user._id }, updateFields);
      }
    }

    req.data = {
      id: user._id,
      state: user?.isRegistered ? "CONFIRMED" : "__SIGNUP_AWAITED",
      _apiversion: "1.0.127",
      _mscode: "mainms",
    };

    next();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});