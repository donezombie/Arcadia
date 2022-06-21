import TodoModel from 'models/todo.model';
import httpService from './httpServices';
import { ResponseGenerator } from 'interfaces';

class TodosService {
  getTodos(): Promise<ResponseGenerator<TodoModel[]>> {
    return httpService.get('https://jsonplaceholder.typicode.com/todos');
  }
}

export default new TodosService();
