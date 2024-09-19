export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'defaultSecret', // Use variáveis de ambiente para proteger a chave
};
