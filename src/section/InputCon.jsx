// src/components/InputCon.js
import React, { useState } from "react";
import GroupModal from "../components/GroupModal";

export default function InputCon({
  groups,
  setGroups,
  contactLists,
  setContactLists,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState("");
  const [note, setNote] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [groupModal, setGroupModal] = useState(false);

  // 이름 유효성 검사
  const validateName = (name) => {
    const nameRegex = /^[가-힣]{2,}$/;
    if (!nameRegex.test(name)) {
      setNameError("이름은 두 글자 이상의 한글이어야 합니다.");
    } else {
      setNameError("");
    }
  };

  // 전화번호 유효성 검사
  const validatePhone = (phone) => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("전화번호는 010-0000-0000 형식이어야 합니다.");
    } else {
      setPhoneError("");
    }
  };

  const addList = (newList) => {
    if (!newList || !newList.name || !newList.phone) return;
    const newLists = [...contactLists, newList];
    setContactLists(newLists);
    localStorage.setItem("contactList", JSON.stringify(newLists));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateName(name);
    validatePhone(phone);

    const isNameDuplicate = contactLists.some(
      (contact) => contact.name === name
    );
    const isPhoneDuplicate = contactLists.some(
      (contact) => contact.phone === phone
    );

    if (isNameDuplicate) {
      alert("이미 존재하는 이름입니다.");
      return;
    }

    if (isPhoneDuplicate) {
      alert("이미 존재하는 전화번호입니다.");
      return;
    }

    if (!nameError && !phoneError && name && phone) {
      const newContact = { name, phone, group, note };

      addList(newContact);

      console.log("새 연락처:", newContact);
      setName("");
      setPhone("");
      setGroup("");
      setNote("");
    }
  };
  const handleOpenModal = () => {
    setGroupModal(true);
  };

  return (
    <form className="InputForm" onSubmit={handleSubmit}>
      <div className="inputName">
        <label>이름</label>
        <input
          type="text"
          value={name}
          placeholder="이름"
          onChange={(e) => {
            setName(e.target.value);
            validateName(e.target.value);
          }}
          required
        />
        {nameError && <p className="nameError">{nameError}</p>}
      </div>
      <div className="inputPhone">
        <label>전화번호</label>
        <input
          type="text"
          value={phone}
          placeholder="전화번호"
          onChange={(e) => {
            setPhone(e.target.value);
            validatePhone(e.target.value);
          }}
          required
        />
        {phoneError && <p className="phoneError">{phoneError}</p>}
      </div>
      <div>
        <label>그룹</label>
        <select
          className="select"
          name="groupSelect"
          id="groupSelect"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          required
        >
          <option value="">그룹선택</option>
          {groups.map((g, index) => (
            <option key={index} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button className="groupAddBtn" type="button" onClick={handleOpenModal}>
          조직추가
        </button>
      </div>
      <div>
        <label>기록</label>
        <input
          type="text"
          value={note}
          placeholder="간단한기록"
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <button className="btn" type="submit">
        저장
      </button>
      {groupModal && (
        <GroupModal
          contactLists={contactLists}
          setGroupModal={setGroupModal}
          setGroups={setGroups}
          groups={groups}
        />
      )}
    </form>
  );
}
