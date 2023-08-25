const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

module.exports = {
  async register(req, res) {
    try {
      const { userName, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const userExists = await User.findOne({ $or: [{ email }, { userName }] });

      if (userExists) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({ userName, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create and send a JWT token
      const token = jwt.sign({ userId: user._id }, "secretKey", {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in" });
    }
  },

  async createAdmin(req, res) {
    try {
      // Check if an admin already exists
      const adminExists = await User.findOne({ role: "admin" });

      if (adminExists) {
        return res
          .status(409)
          .json({ message: "An admin account already exists" });
      }

      const { userName, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the admin user
      const adminUser = new User({
        userName,
        email,
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();

      res.status(201).json({ message: "Admin user created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating admin user" });
    }
  },

  async createSuperAdmin(req, res) {
    try {
      const { userName, email, password, confirmPassword } = req.body;
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the admin user
      const SuperAdmin = new User({
        userName,
        email,
        password: hashedPassword,
        role: "super admin",
      });

      await SuperAdmin.save();

      res.status(201).json({ message: "SuperAdmin created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating SuperAdmin" });
    }
  },
};
