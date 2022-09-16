import AlertImage from "./AlertImage";
import IntentionsImage from "./IntentionsImage";

export default function AlertImages({
  alertImageURL,
  intentionsImageURL,
  visible,
  setVisible,
}) {
  return (
    <>
      <AlertImage
        img={alertImageURL}
        left={300}
        visible={visible}
        setVisible={setVisible}
      />
      <IntentionsImage
        img={intentionsImageURL}
        right={10}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
}
