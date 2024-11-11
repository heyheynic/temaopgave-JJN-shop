const PrimaryButton = ({ btnText, theme = "default" }) => {
  const themes =
    theme === "red"
      ? "bg-accent "
      : theme === "white"
      ? "bg-white text-black outline outline-2 hover:outline-none"
      : theme === "black"
      ? "bg-black"
      : "bg-dark "; // default
  return (
    <div className={`btn text-normal ${themes}`}>
      {btnText}
    </div>
  );
};

export default PrimaryButton;
