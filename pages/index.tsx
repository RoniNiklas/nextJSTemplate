import type { NextPage } from 'next';
import trpc from '@root/utils/trpc';
import Head from 'next/head';

import ReactModal from 'react-modal';

import If from '@root/globals/ReusableComponents/If';
import Else from '@root/globals/ReusableComponents/Else';
import ElseIf from '@root/globals/ReusableComponents/ElseIf';

import TodoTableItem from '@root/components/TodoTableItem';
import Header from '@root/components/Header';

import { useState } from 'react';
import UpsertTodo from '@root/components/UpsertTodo';
import Map from '@root/globals/ReusableComponents/Map';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const todoQuery = trpc.useQuery(['todos.getMany']);
  const shownTodos = todoQuery.data || [];

  const mutation = trpc.useMutation(['todos.delete'], {
    onSuccess: () => {
      todoQuery.refetch();
    },
  });

  const toggleModal = (id: number | null, show : boolean) => {
    setEditId(id);
    setShowModal(show);
  };

  ReactModal.setAppElement('#app');

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Ronin Kotisivu</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/icon.png" />
        </Head>
      </div>
      <div id="app">
        <Header
          refresh={todoQuery.refetch}
          toggleModal={() => { toggleModal(null, !showModal); }}
        />
        <main>
          <div className="p-4 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 justify-center gap-4 auto-rows-fr">
            <If rif={todoQuery.isLoading || mutation.isLoading}>
              Loading...
              <ElseIf elIf={shownTodos.length === 0}>
                No todos!
              </ElseIf>
              <Else>
                <Map
                  items={shownTodos}
                  getKey={(item) => item.id}
                  renderItem={(item) => (
                    <TodoTableItem
                      todo={item}
                      onDelete={() => { mutation.mutate(item.id); }}
                      onEdit={() => { toggleModal(item.id, true); }}
                    />
                  )}
                />
              </Else>
            </If>
          </div>
        </main>
        <ReactModal
          isOpen={showModal}
          className="w-full flex items-center justify-center"
          overlayClassName="modal"
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          shouldReturnFocusAfterClose
        >
          <UpsertTodo
            id={editId}
            closeModal={() => {
              toggleModal(null, false);
              todoQuery.refetch();
            }}
          />
        </ReactModal>
      </div>
    </>
  );
};

export default Home;