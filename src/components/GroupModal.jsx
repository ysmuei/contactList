import React, { useState, useEffect } from "react";

export default function GroupModal({ contactLists, setGroupModal }) {
  const [groupList, setGroupList] = useState([]);
  const [newGroup, setNewGroup] = useState("");

  // 로컬 스토리지에서 그룹 리스트를 불러옴
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroupList(storedGroups);
  }, []);

  // 새 그룹 추가
  const addGroup = () => {
    if (!newGroup.trim()) return; // 빈 값은 추가하지 않음
    if (!groupList.includes(newGroup)) {
      const updatedGroups = [...groupList, newGroup];
      setGroupList(updatedGroups);
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      setNewGroup("");
    }
  };

  // 그룹 삭제
  const removeGroup = (group) => {
    // 그룹이 contactLists에서 사용 중인지 확인
    const isGroupInUse = contactLists.some(
      (contact) => contact.group === group
    );

    if (isGroupInUse) {
      alert("현재 사용 중인 그룹은 삭제할 수 없습니다.");
      return;
    }

    const updatedGroups = groupList.filter((g) => g !== group);
    setGroupList(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  const closeModal = () => {
    setGroupModal(false);
  };
  return (
    <div className="modalCon">
      <div className="modal">
        <h2>그룹 관리</h2>
        <ul>
          {groupList.map((group, index) => (
            <li className="groupList" key={index}>
              {group}
              <p onClick={() => removeGroup(group)}>X</p>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="새 그룹 이름"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
          />
          <button type="button" onClick={addGroup}>
            추가
          </button>
        </div>
        <button className="closeModal" type="button" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
}
