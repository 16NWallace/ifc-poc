var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ifc-poc';

module.exports = connectionString;