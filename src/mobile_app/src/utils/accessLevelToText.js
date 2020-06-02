export const accessLevelToText = text => {
  const accessLevel = {
    AL: 'Administrador',
    NL: 'Usuario',
    LL: 'Perfil limitado',
  };

  return accessLevel[text];
};
