export default function DetailModal({ contact, closeDetailModal }) {
  const closeModal = () => {
    closeDetailModal(false);
  };
  console.log(contact);

  return (
    <div className="modalCon">
      <div className="modal detailCon">
        <h2>연락처 상세 정보</h2>
        <p>이름 : {contact.name}</p>
        <p>전화번호 : {contact.phone}</p>
        <p>그룹 : {contact.group}</p>
        <p>메모 : {contact.note}</p>
        <button
          className="closeModal detailCloseBtn"
          type="button"
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
