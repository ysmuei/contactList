import React, { useEffect, useState } from "react";
import DetailModal from "./DetailModal";

export default function ListArea({ contactList, setContactLists }) {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      setFilteredContacts(
        contactList.filter(
          (contact) =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phone.includes(searchTerm) ||
            contact.group.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredContacts(contactList);
    }
  }, [searchTerm, contactList]);

  const handleShowAll = () => {
    setSearchTerm("");
  };

  const removeList = (rmContact) => {
    const updateList = contactList.filter((contact) => contact !== rmContact);
    setContactLists(updateList);
    localStorage.setItem("contactList", JSON.stringify(updateList));
  };

  const handleDetailModal = (contact) => {
    setSelectedContact(contact);
  };
  const closeDetailModal = () => {
    setSelectedContact(null);
  };

  return (
    <div className="listCon">
      <div className="inputCon">
        <input
          className="listInput"
          type="text"
          placeholder="검색어를 입력 후 엔터를 누르세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn" onClick={handleShowAll}>
          전체리스트 보기
        </button>
      </div>
      <ul className="lists">
        {Array.isArray(filteredContacts) && filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <li className="list" key={index}>
              <p>
                {contact.name} {contact.phone} {contact.group}
              </p>
              <div className="listBtns">
                <button
                  type="button"
                  onClick={() => handleDetailModal(contact)}
                >
                  세부사항
                </button>
                <button onClick={() => removeList(contact)}>삭제</button>
              </div>
            </li>
          ))
        ) : (
          <p>연락처가 없습니다.</p>
        )}
      </ul>
      {selectedContact && (
        <DetailModal
          contact={selectedContact}
          closeDetailModal={closeDetailModal}
        />
      )}
    </div>
  );
}
