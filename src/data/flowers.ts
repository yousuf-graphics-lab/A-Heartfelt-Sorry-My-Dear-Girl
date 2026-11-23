export type FlowerKind =
  | 'pinkRose'
  | 'redRose'
  | 'whiteRose'
  | 'tulip'
  | 'lavender'
  | 'cherryBlossom'
  | 'sunflower'
  | 'heartFlower';

export interface FlowerCardTheme {
  /** outer card container classes */
  card: string;
  /** colored glow behind the flower thumbnail */
  halo: string;
  /** heading (flower name) classes */
  name: string;
  /** small caps eyebrow above the name */
  eyebrow: string;
  /** message body classes */
  body: string;
  /** quote mark color */
  quote: string;
  /** divider heart colour */
  divider: string;
  /** close button classes */
  closeBtn: string;
  /** outer close (pill under the card) classes */
  footerBtn: string;
}

export interface FlowerDef {
  id: number;
  kind: FlowerKind;
  name: string;
  epigraph: string;
  note: string;
  /** bloom centre in the bouquet stage, as % of the stage width/height */
  x: number;
  y: number;
  /** bloom width as % of the stage width */
  span: number;
  swayDuration: number;
  swayDelay: number;
  theme: FlowerCardTheme;
}

export const FLOWERS: FlowerDef[] = [
  {
    id: 1,
    kind: 'pinkRose',
    name: 'The Pink Rose',
    epigraph: 'a petal for every tear',
    note: 'Amar pakhi, ami kokhono chai nai amar kono kothay tomar mon kharap hok. Jodi amar jonno tomar chokhe ekfota jol eshe thake, tahole ami shotti mon theke sorry.',
    x: 19,
    y: 38,
    span: 21,
    swayDuration: 5.6,
    swayDelay: -0.4,
    theme: {
      card: 'bg-gradient-to-br from-[#FFF0F4] via-[#FCDCE6] to-[#F3B9CB] border-[#E58CA4]/60',
      halo: 'bg-[#F4A9BE]',
      name: 'text-[#A83D58]',
      eyebrow: 'text-[#C85B79]/80',
      body: 'text-[#59303f]',
      quote: 'text-[#E58CA4]/70',
      divider: 'text-[#C85B79]',
      closeBtn: 'text-[#A83D58] hover:bg-[#A83D58]/10',
      footerBtn: 'bg-[#C85B79] hover:bg-[#A83D58] text-[#FFF5F5]',
    },
  },
  {
    id: 2,
    kind: 'redRose',
    name: 'The Red Rose',
    epigraph: 'what my heart keeps repeating',
    note: 'Tumi amar jiboner onek special ekjon. Tomar feelings, tomar oviman, tomar choto choto abdar shobkichui amar kache important. Ami chai tomar protita onubhuti bujhte shikhte.',
    x: 81,
    y: 38,
    span: 21,
    swayDuration: 6.2,
    swayDelay: -1.6,
    theme: {
      card: 'bg-gradient-to-br from-[#7E2B42] via-[#9C3A56] to-[#B85570] border-[#E58CA4]/35',
      halo: 'bg-[#C85B79]',
      name: 'text-[#FFD9E2]',
      eyebrow: 'text-[#F3A9BB]/90',
      body: 'text-[#FCE4EC]',
      quote: 'text-[#F3A9BB]/60',
      divider: 'text-[#F3A9BB]',
      closeBtn: 'text-[#FFD9E2] hover:bg-white/10',
      footerBtn: 'bg-[#FFD9E2] hover:bg-white text-[#7E2B42]',
    },
  },
  {
    id: 3,
    kind: 'whiteRose',
    name: 'The White Rose',
    epigraph: 'honesty, gently offered',
    note: 'Ami perfect na, amar vul hoy. But ami chai amar vul theke shikhte, nijeke improve korte, ar tomar sathe aro bhalo vabe shobkichu handle korte.',
    x: 33,
    y: 22.5,
    span: 19,
    swayDuration: 5.1,
    swayDelay: -2.3,
    theme: {
      card: 'bg-gradient-to-br from-[#FFFDF4] via-[#FBF6E9] to-[#EFE6D2] border-[#D8B47A]/70',
      halo: 'bg-[#EDE2CB]',
      name: 'text-[#8A6B34]',
      eyebrow: 'text-[#B98F4E]',
      body: 'text-[#585040]',
      quote: 'text-[#D8B47A]/80',
      divider: 'text-[#B98F4E]',
      closeBtn: 'text-[#8A6B34] hover:bg-[#D8B47A]/20',
      footerBtn: 'bg-[#B98F4E] hover:bg-[#8A6B34] text-[#FFFBEF]',
    },
  },
  {
    id: 4,
    kind: 'tulip',
    name: 'The Pink Tulip',
    epigraph: 'for the little ordinary miracles',
    note: 'Tomar sathe choto choto kotha bola, ekshathe hasha, tomar paglami gulo dekha, shobkichui amar kache onek precious. Ami amader shundor moment gulo miss kori.',
    x: 67,
    y: 22.5,
    span: 18,
    swayDuration: 4.8,
    swayDelay: -0.9,
    theme: {
      card: 'bg-gradient-to-br from-[#FFE9DE] via-[#FBD3C8] to-[#F4AFAE] border-[#E58C8C]/55',
      halo: 'bg-[#F6B3AC]',
      name: 'text-[#B0544F]',
      eyebrow: 'text-[#CB7466]',
      body: 'text-[#5F3A35]',
      quote: 'text-[#E58C8C]/70',
      divider: 'text-[#CB7466]',
      closeBtn: 'text-[#B0544F] hover:bg-[#B0544F]/10',
      footerBtn: 'bg-[#CB7466] hover:bg-[#A8544A] text-[#FFF5F0]',
    },
  },
  {
    id: 5,
    kind: 'lavender',
    name: 'The Lavender',
    epigraph: 'calm for a stormy evening',
    note: 'Jokhon tomar mon kharap thakbe, please nijeke eka mone koro na. Tomar feelings amar kache important. Ami chai tumi mon khule tomar kotha bolte paro.',
    x: 12.5,
    y: 23,
    span: 13,
    swayDuration: 6.6,
    swayDelay: -3.1,
    theme: {
      card: 'bg-gradient-to-br from-[#EFE9FA] via-[#DDD0EF] to-[#C0AEDE] border-[#8F7BB8]/45',
      halo: 'bg-[#B9A7D9]',
      name: 'text-[#5E4A8A]',
      eyebrow: 'text-[#8F7BB8]',
      body: 'text-[#453A5C]',
      quote: 'text-[#8F7BB8]/70',
      divider: 'text-[#7B68A6]',
      closeBtn: 'text-[#5E4A8A] hover:bg-[#8F7BB8]/15',
      footerBtn: 'bg-[#7B68A6] hover:bg-[#5E4A8A] text-[#F4EFFC]',
    },
  },
  {
    id: 6,
    kind: 'cherryBlossom',
    name: 'The Cherry Blossom',
    epigraph: 'beauty that blooms after the fall',
    note: 'Sorry bolar cheye amar kache beshi important holo nijer behavior diye tomake bujhiye dewa je ami amar vul gulo shudhre nite chai.',
    x: 87.5,
    y: 23,
    span: 18,
    swayDuration: 5.9,
    swayDelay: -1.1,
    theme: {
      card: 'bg-gradient-to-br from-[#FFF3F7] via-[#FCDCEC] to-[#F6BED6] border-[#E5A0BC]/60',
      halo: 'bg-[#F7C4DA]',
      name: 'text-[#B04A72]',
      eyebrow: 'text-[#CE7099]',
      body: 'text-[#59303F]',
      quote: 'text-[#E5A0BC]/75',
      divider: 'text-[#CE7099]',
      closeBtn: 'text-[#B04A72] hover:bg-[#CE7099]/10',
      footerBtn: 'bg-[#CE7099] hover:bg-[#A85178] text-[#FFF5FA]',
    },
  },
  {
    id: 7,
    kind: 'sunflower',
    name: 'The Little Sunflower',
    epigraph: 'a pocketful of daylight for you',
    note: 'My dear sweetheart pakhi, tomar oi mishti hashi ta amar onek priyo. Ami chai tomar mukhe abar shei shundor hashi fire ashuk. Please nijer kheyal rekho.',
    x: 50,
    y: 12.5,
    span: 24,
    swayDuration: 5.3,
    swayDelay: -2.8,
    theme: {
      card: 'bg-gradient-to-br from-[#FFF8DC] via-[#FCEBA8] to-[#F2CE6E] border-[#D8B47A]/80',
      halo: 'bg-[#F2CE6E]',
      name: 'text-[#7A5410]',
      eyebrow: 'text-[#B98F4E]',
      body: 'text-[#55401A]',
      quote: 'text-[#D8B47A]/85',
      divider: 'text-[#B98F4E]',
      closeBtn: 'text-[#7A5410] hover:bg-[#B98F4E]/15',
      footerBtn: 'bg-[#B98F4E] hover:bg-[#8A6414] text-[#FFFBEF]',
    },
  },
  {
    id: 8,
    kind: 'heartFlower',
    name: 'The Heart Flower',
    epigraph: 'everything, in one small bloom',
    note: 'Shob oviman ekdin e hoyto shesh hobe na, but ami chai amra aste aste shobkichu thik kori. Tomake bujhi, tomar feelings ke respect kori, ar aro bhalo ekjon hoye uthte pari. I am really sorry, Samiya. ❤️',
    x: 50,
    y: 34.5,
    span: 22,
    swayDuration: 4.5,
    swayDelay: -0.2,
    theme: {
      card: 'bg-gradient-to-br from-[#F7A9C0] via-[#DE7396] to-[#B04A6E] border-[#FFD9E2]/40',
      halo: 'bg-[#E0658C]',
      name: 'text-[#FFF0F4]',
      eyebrow: 'text-[#FFD0DC]/95',
      body: 'text-[#FFF0F4]',
      quote: 'text-[#FFD0DC]/60',
      divider: 'text-[#FFD0DC]',
      closeBtn: 'text-[#FFF0F4] hover:bg-white/15',
      footerBtn: 'bg-[#FFF0F4] hover:bg-white text-[#8C2E47]',
    },
  },
];

export const TOTAL_FLOWERS = FLOWERS.length;
