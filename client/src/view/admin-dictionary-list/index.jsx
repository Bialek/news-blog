import React, { useContext, useEffect, useState, useCallback } from "react";
import DictionaryService from "services/dictionary";
import Loader from "components/loader";
import "./styles.scss";
import { StoreContext } from "context";
import Modal from "components/modal";

export default function AdminDictionariesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setStoreData } = useContext(StoreContext);
  const [collection, setCollection] = useState(null);
  const [modalData, setModalData] = useState(null);

  const getDictionaries = useCallback(() => {
    DictionaryService.getAll()
      .then((response) => {
        setCollection(response);
        setStoreData((prevData) => ({
          ...prevData,
          dictionaryData: response.reduce((dictObject, dictionary) => {
            if (dictObject[dictionary.type]) {
              dictObject[dictionary.type].push(dictionary);
            } else {
              dictObject[dictionary.type] = [dictionary];
            }
            return dictObject;
          }, {}),
        }));
      })
      .finally(() => setIsLoading(false));
  }, [setStoreData]);

  useEffect(() => {
    if (collection === null) {
      setIsLoading(true);
      DictionaryService.getAll()
        .then((response) => {
          setCollection(response);
        })
        .catch((error) => {
          setError(`Error ${error.status} ${error.statusText}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [collection]);

  function onClickDeleteHandler(id) {
    setIsLoading(true);
    DictionaryService.delete(id)
      .then(() => {
        getDictionaries();
      })
      .catch((error) => {
        setError(`Error ${error.status} ${error.statusText}`);
      });
  }

  function postDictionaryData() {
    setIsLoading(true);
    const request = modalData.id
      ? DictionaryService.update
      : DictionaryService.create;

    request(modalData)
      .then(() => {
        getDictionaries();
        setModalData(null);
      })
      .catch((error) => {
        setError(`Error ${error?.generatedMessage ?? ""} ${error?.code ?? ""}`);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="container mt-3">
      <div>
        <div className="container">
          <h1 className="title">Dictionary list</h1>
          <button
            className="button dictionary-list__add-btn"
            onClick={() => setModalData({})}
          >
            Add article
            <i className="fas fa-plus"></i>
          </button>
          {isLoading && <Loader />}
          {error && !isLoading && <div>{error}</div>}
          {collection && !isLoading && (
            <div className="dictionary-list">
              {collection.map((dictionary) => (
                <div className="dictionary-list__row" key={dictionary.id}>
                  <div className="dictionary-list__row-text">
                    {dictionary.name}
                  </div>
                  <div className="dictionary-list__row-text">
                    {dictionary.type}
                  </div>

                  <div
                    className="dictionary-list__table-btn"
                    onClick={() =>
                      setModalData({
                        id: dictionary.id,
                        name: dictionary.name,
                        type: dictionary.type,
                      })
                    }
                  >
                    <i className="fas fa-edit"></i>
                  </div>
                  <div
                    className="dictionary-list__table-btn"
                    onClick={() => onClickDeleteHandler(dictionary.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {modalData !== null && (
        <Modal
          title="Dictionary form"
          onClose={() => setModalData(null)}
          onSave={postDictionaryData}
        >
          <div>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={modalData.name}
                  onChange={(event) =>
                    setModalData({ ...modalData, name: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={modalData.type}
                  onChange={(event) =>
                    setModalData({ ...modalData, type: event.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
