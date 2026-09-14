import type { CanalContato } from '../types/Contato'

export const canaisContato: CanalContato[] = [
  {
    nome: 'E-mail',
    descricao: 'sac@soulup.io',
    link: 'mailto:sac@soulup.io',
    externo: false,
  },
  {
    nome: 'Instagram',
    descricao: '@soulupoficial',
    link: 'https://www.instagram.com/soulupoficial/',
    externo: true,
  },
  {
    nome: 'Facebook',
    descricao: 'Soul Prime Oficial',
    link: 'https://www.facebook.com/soulprimeoficial/',
    externo: true,
  },
  {
    nome: 'LinkedIn',
    descricao: 'Soul Prime',
    link: 'https://www.linkedin.com/company/soulprimeio',
    externo: true,
  },
]