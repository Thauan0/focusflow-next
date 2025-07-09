// src/components/sections/TodoListPanel.tsx

'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ListTodo, Plus, Trash2 } from 'lucide-react';
import { Todo } from '@/types';
import { CustomCheckbox } from './CustomCheckBox';
import styles from './TodoListModal.module.css';

interface TodoListPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const panelVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '100%', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export function TodoListPanel({ isOpen, onClose }: TodoListPanelProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTodos = localStorage.getItem('focusflow_todos');
      setTodos(storedTodos ? JSON.parse(storedTodos) : []);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('focusflow_todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    const newTodo: Todo = { id: Date.now().toString(), text: newTask, completed: false };
    setTodos([newTodo, ...todos]);
    setNewTask('');
  };

  const handleToggleTask = (id: string) => {
    setTodos(
      todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };

  const handleDeleteTask = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.panel}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.header}>
              <ListTodo size={28} className={styles.headerIcon} />
              <h2 className={styles.title}>Minhas Tarefas</h2>
              <button onClick={onClose} className={styles.closeButton}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddTask} className={styles.form}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Adicionar nova tarefa..."
                className={styles.input}
              />
              <button type="submit" className={styles.addButton}>
                <Plus size={20} />
              </button>
            </form>

            <ul className={styles.taskList}>
              <AnimatePresence>
                {todos.map((todo) => (
                  <motion.li
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={styles.taskItem}
                  >
                    <CustomCheckbox
                      id={todo.id}
                      label={todo.text}
                      checked={todo.completed}
                      onChange={() => handleToggleTask(todo.id)}
                    />
                    <button onClick={() => handleDeleteTask(todo.id)} className={styles.deleteButton}>
                      <Trash2 size={18} />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}