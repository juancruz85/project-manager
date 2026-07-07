export default function Navbar() {
  return (
    <nav
      className="
        h-14
  
        bg-gradient-to-b
        from-[#444]
        to-[#1d1d1d]
  
        border-b
        border-black
  
        shadow-xl
        "
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <h1
          className="
            text-2xl
            font-helvetica-neue
            font-semibold
            tracking-wide
            text-white
          "
        >
          A Project Manager
        </h1>

        <button
          className="
    h-8
    px-5

    rounded-xl

    border
    border-[#1a1a1a]

    bg-gradient-to-b
    from-[#565656]
    to-[#303030]

    text-sm
    font-semibold
    text-zinc-100

    shadow-[0_4px_10px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.18),inset_0_-1px_0_rgba(0,0,0,.45)]

    transition-all
    duration-150

    hover:-translate-y-[1px]
    hover:brightness-105

    active:translate-y-[2px]
    active:shadow-[inset_0_3px_8px_rgba(0,0,0,.55)]
  "
        >
          Login
        </button>
      </div>
    </nav>
  );
}
