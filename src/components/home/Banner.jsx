
// eslint-disable-next-line react/prop-types
export default function Banner({extraClasses, title}) {
  return (
    <div
      className={`${extraClasses} h-[100dvh] w-full flex items-center justify-start text-[30px]`}
    >
      <h1>{title}</h1>
    </div>
  );
}
