// goodies - files published at public.syn.horse and listed on /goodies.
// sizes are decorative approximations; refresh them when the files
// change upstream.
export interface Goody {
  desc: string
  path: string
  size: string
  url: string
}

export const GOODIES: Goody[] = [
  {
    path: "/ssh",
    size: "~7k",
    desc: "my public ssh keys, commented. drop them in authorized_keys and we're flatmates.",
    url: "https://public.syn.horse/ssh/keys",
  },
  {
    path: "/gpg",
    size: "~12k",
    desc: "my public gpg keys. encrypt things to me, verify things from me. trust model: bring your own.",
    url: "https://public.syn.horse/gpg/keys",
  },
  {
    path: "/sudo",
    size: "~32b",
    desc: "one line of sudoers, should you wish to give me root.",
    url: "https://public.syn.horse/sudo",
  },
]

// secret goodies - revealed on /goodies only while konami mode is active.
// these are placeholders; swap in real files once they exist at the urls
// (they 404 on public.syn.horse until then). their size renders as the
// classified stamp, so keep it a word rather than a number.
export const SECRET_GOODIES: Goody[] = [
  {
    path: "/horse",
    size: "classified",
    desc: "an ascii horse. hand-tuned, load-bearing, not to be fed.",
    url: "https://public.syn.horse/horse",
  },
  {
    path: "/konami",
    size: "classified",
    desc: "the sequence itself, annotated. you clearly already know it, but it's nice to have things in writing.",
    url: "https://public.syn.horse/konami",
  },
  {
    path: "/mixtape",
    size: "classified",
    desc: "an m3u of what this site was built to. no track notes. no apologies.",
    url: "https://public.syn.horse/mixtape",
  },
]
