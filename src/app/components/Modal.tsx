import { useEffect } from "react";

function Modal_component() {
  useEffect(() => {
    (document.getElementById("my_modal_2") as HTMLDialogElement)?.showModal();
  }, []);
  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Important disclaimer</h3>
          <p className="py-4">
            <strong>Discalimer 1.</strong>
            {` Please note all conversatins are recorded for "training purposes" so don't type some stupid stuff`}
          </p>
          <p className="py-4">
            <strong>Discalimer 2.</strong>
            {` I am by no means responsible for the output of this "machine learning" program that speaks for itself. `}
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Modal_component;
