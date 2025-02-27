import "./header.scss";

export const Header = ({ title }: { title: string }) => {
  return (
    <>
      <div className={"header flex"}>
        <div className={"title"}>{title}</div>
      </div>
    </>
  );
};
