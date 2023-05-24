import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: async (todo: Todo) => {
      const response = await axios.post<Todo>(
        "https://jsonplaceholder.typicode.com/todos",
        todo
      );
      return response.data;
    },
    // mutationFn: todoService.post,
    onMutate: (newTodo: Todo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);

      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodo) => {
      //approach 1: unvalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey: CACHE_KEY_TODOS,
      // });
      //................................................
      //approach 2: updating the data in the cache
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );

      onAdd();
    },

    onError(error, newTodo, context) {
      if (!context) return;

      queryClient.setQueryData(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};

export default useAddTodo;
