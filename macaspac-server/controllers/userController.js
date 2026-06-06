const User = require('../models/User');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // for generating tokens

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password field
    // Normalize role/type so UI shows the intended role even if DB has inconsistent fields
    const normalized = users.map((u) => {
      const type = (u.type || '').toString().toLowerCase();
      const role = (u.role || '').toString().toLowerCase();
      const resolved = type === 'admin' || role === 'admin'
        ? 'admin'
        : type === 'editor' || role === 'editor'
          ? 'editor'
          : 'viewer';
      return {
        ...u.toObject(),
        type: resolved,
        role: resolved,
      };
    });
    res.json(normalized);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    // Ensure the password is included in the request body
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Validate password length (minimum 8 characters)
    if (req.body.password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const requestedType = String(req.body.type || req.body.role || '').toLowerCase();
    const allowedType = ['admin', 'editor', 'viewer'];

    const type = allowedType.includes(requestedType) ? requestedType : 'viewer';
    const role = type;

    console.log('createUser body type:', req.body.type, 'requestedType:', requestedType, 'computed type:', type);

    // Create the user with the hashed password and properly assigned role and type
    const user = await User.create({
      ...req.body,
      type,
      role,
      address: req.body.address || '',
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const allowedType = ['admin', 'editor', 'viewer'];

    if (req.body.type || req.body.role) {
      const requestedType = String(req.body.type || req.body.role || '').toLowerCase();
      req.body.type = allowedType.includes(requestedType) ? requestedType : 'viewer';
      req.body.role = req.body.type;
    }

    // Check if the password is being updated
    if (req.body.password) {
      // Hash the new password
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update the user with the new data
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, type: user.type || user.role || 'viewer', firstName: user.firstName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };
