declare module '@google-cloud/tasks' {
    export class CloudTasksClient {
      constructor();
      queuePath(project: string, location: string, queue: string): string;
      createTask(request: any): Promise<any>;
    }
  }