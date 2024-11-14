const PrimaryButton = ({ btnText, theme = "default", onClick }) => {
  const themes =
    theme === "red"
      ? "bg-accent "
      : theme === "white"
      ? "bg-[--background] text-[--foreground] outline outline-2 hover:outline-none"
      : theme === "black"
      ? "bg-[--foreground] text-[--background]"
      : theme === "soldOut"
      ? "bg-[--foreground] text-[--background] hover:bg-[--foreground] cursor-default"
      : "bg-[--foreground] "; // default
  return (
    <div className={`btn text-normal ${themes}`} onClick={onClick}>
      {btnText}
    </div>
  );
};

export default PrimaryButton;
