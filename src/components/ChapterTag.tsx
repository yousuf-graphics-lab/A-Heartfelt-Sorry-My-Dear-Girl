import { Feather } from 'lucide-react';

interface ChapterTagProps {
  chapter: string;
  title: string;
  tone?: 'light' | 'dark';
  className?: string;
}

/** Hand-drawn storybook chapter marker, e.g. "Chapter One — The Still Life". */
export default function ChapterTag({ chapter, title, tone = 'light', className = '' }: ChapterTagProps) {
  const chapterCls = tone === 'light' ? 'text-[#B04A63]' : 'text-[#E9C878]';
  const lineCls = tone === 'light' ? 'bg-[#B04A63]/45' : 'bg-[#E9C878]/45';
  const inkCls = tone === 'light' ? 'text-[#46303B]/70' : 'text-[#FFF5F5]/70';
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`h-px w-7 sm:w-10 ${lineCls}`} aria-hidden="true" />
      <Feather size={13} strokeWidth={2.2} aria-hidden="true" className={chapterCls} />
      <span className={`font-hand text-[19px] font-semibold leading-none sm:text-[22px] ${chapterCls}`}>{chapter}</span>
      <span className={`font-sans text-[8.5px] font-semibold uppercase leading-none tracking-[0.3em] sm:text-[9px] ${inkCls}`}>
        {title}
      </span>
      <span className={`h-px w-7 sm:w-10 ${lineCls}`} aria-hidden="true" />
    </div>
  );
}
