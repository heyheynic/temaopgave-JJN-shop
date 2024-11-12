const PrimaryButton = ({ btnText, theme = "default", onClick }) => {
  const themes =
    theme === "red"
      ? "bg-accent "
      : theme === "white"
      ? "bg-white text-black outline outline-2 hover:outline-none"
      : theme === "black"
      ? "bg-black"
      : theme === "soldOut"
      ? "bg-dark hover:bg-dark cursor-default"
      : "bg-dark "; // default
  return (
    <div className={`btn text-normal ${themes}`} onClick={onClick}>
      {btnText}
    </div>
  );
};

export default PrimaryButton;
