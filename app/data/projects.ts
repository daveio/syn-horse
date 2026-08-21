export type ProjectTagKind = "hot" | "cool" | "lilac" | "warn"

export interface ProjectTag {
  k?: ProjectTagKind
  l: string
}

export interface Project {
  desc: string
  name: string
  tags: ProjectTag[]
  url: string
  yr: string
}

export const PROJECTS: Project[] = [
  {
    name: "syn.horse",
    yr: "2026",
    desc: "this site. nuxt 4 on cloudflare workers. used to be dave.io until I sold it.",
    url: "synmux/syn-horse",
    tags: [{ l: "SHIPPED", k: "hot" }, { l: "TYPESCRIPT" }, { l: "NUXT" }, { l: "CLOUDFLARE WORKERS" }],
  },
  {
    name: "genderbase",
    yr: "2025",
    desc: "a directory of gender-affirming resources. low ui, high index. pulls from a few good sources, refuses to pull from bad ones.",
    url: "synmux/genderbase",
    tags: [{ l: "IN DEVELOPMENT", k: "cool" }, { l: "RUBY" }, { l: "RAILS" }, { l: "DOCKER" }],
  },
  {
    name: "rhymepass",
    yr: "2026",
    desc: "generates rhyming passwords. yes, really. yes, secure. keep the lengths long or use random mode.",
    url: "synmux/rhymepass",
    tags: [{ l: "SHIPPED", k: "hot" }, { l: "TYPESCRIPT" }, { l: "CLI" }],
  },
  {
    name: "recon",
    yr: "2026",
    desc: "resize and convert images on iOS. a small, opinionated, genuinely fast tool. free and devoid of analytics.",
    url: "synmux/recon",
    tags: [{ l: "UNRELEASED", k: "cool" }, { l: "iOS" }, { l: "SWIFT" }],
  },
  {
    name: "claude-commit",
    yr: "2026",
    desc: "generate commit messages using your claude subscription. opencommit annoyed me with api pricing.",
    url: "synmux/claude-commit",
    tags: [{ l: "SHIPPED", k: "hot" }, { l: "TYPESCRIPT" }, { l: "CLI" }],
  },
  {
    name: "aicmd",
    yr: "2026",
    desc: "tell the model what you want to do at the command line, and it will generate the command for you. supports bash, zsh, and fish.",
    url: "synmux/tabby",
    tags: [{ l: "SHIPPED", k: "hot" }, { l: "TYPESCRIPT" }, { l: "CLI" }],
  },
]

// abandoned projects - revealed on /projects only when konami mode is active.
// these are placeholders; swap in real dead projects. they link nowhere, so an
// epitaph (cause of death) takes the place of a live project's url.
export interface AbandonedProject {
  desc: string
  epitaph: string
  name: string
  tags: ProjectTag[]
  yr: string
}

export const ABANDONED_PROJECTS: AbandonedProject[] = [
  {
    name: "hoofnote",
    yr: "2021",
    desc: "a markdown notes app that synced over irc. it synced beautifully right up until anyone else joined the channel.",
    epitaph: "killed by a merge conflict it could not survive",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "ELECTRON" }, { l: "IRC" }],
  },
  {
    name: "stablr",
    yr: "2025",
    desc: "uber, but for horses. raised zero pounds, onboarded one horse, and that horse asked to be removed.",
    epitaph: "ran out of runway and oats",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "REACT-NATIVE" }, { l: "SEED" }],
  },
  {
    name: "tachyon-cms",
    yr: "2024",
    desc: "a faster-than-light headless cms. the marketing was the only part that ever shipped.",
    epitaph: "deprecated before its first stable release",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "GO" }, { l: "VAPOURWARE" }],
  },
  {
    name: "regex.horse",
    yr: "2022",
    desc: "a regex tester that explained your pattern in plain english. it was wrong, confidently, every single time.",
    epitaph: "matched nothing in the end",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "WASM" }, { l: "REGRET" }],
  },
  {
    name: "neighbourly",
    yr: "2018",
    desc: "a hyper-local social network for one street. it worked perfectly; nobody on the street spoke to me again.",
    epitaph: "abandoned for the good of the neighbourhood",
    tags: [{ l: "ABANDONED", k: "warn" }, { l: "RAILS" }, { l: "POSTGRES" }],
  },
]
