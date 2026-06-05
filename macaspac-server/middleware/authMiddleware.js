const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email, type: decoded.type };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email, type: decoded.type };
  } catch (error) {
    // Intentionally ignore invalid token for optional auth
  }
  next();
};

const requireRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!allowedRoles.includes(req.user.type)) {
    return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
  }

  next();
};

const requireAdmin = requireRole('admin');
const requireEditorOrAdmin = requireRole('admin', 'editor');

module.exports = { authMiddleware, optionalAuthMiddleware, requireRole, requireAdmin, requireEditorOrAdmin };
