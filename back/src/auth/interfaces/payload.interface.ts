export interface Payload {
  /** Identificador único del usuario (obligatorio para NestJS Auth) */
  id: number;
  
  /** Correo electrónico del usuario (para referencia rápida en el token) */
  correo: string;
  
  // Puedes añadir otros campos necesarios, como roles:
  // rol: 'admin' | 'usuario';
}