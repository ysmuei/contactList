import { useState, useEffect } from "react";
import "./css/App.css";
import DetailModal from "./components/DetailModal";

import InputCon from "./components/InputCon";
import ListArea from "./components/ListArea";

function App() {
  // 연락처 리스트.
  const [contactLists, setContactLists] = useState([]);
  // 조직리스트
  const [groups, setGroups] = useState(["가족", "친구", "직장", "스터디"]);

  localStorage.setItem("groups", JSON.stringify(groups));

  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {
    const storedContacts =
      JSON.parse(localStorage.getItem("contactList")) || [];
    setContactLists(storedContacts);
  }, []);

  console.log(contactLists);

  return (
    <main className="main">
      <h1>연락처 리스트</h1>
      <div className="secCon">
        <section>
          <InputCon
            groups={groups}
            contactLists={contactLists}
            setContactLists={setContactLists}
          />
        </section>
        <section>
          <ListArea
            contactList={contactLists}
            setContactLists={setContactLists}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
