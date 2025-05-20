import { CloudTasksClient } from '@google-cloud/tasks';
import { v4 as uuid } from 'uuid';

const client = new CloudTasksClient();

const project = process.env.GOOGLE_PROJECT_ID!;
const location = process.env.GOOGLE_LOCATION!;
const queue = process.env.GOOGLE_QUEUE_NAME!;
const handlerUrl = process.env.HANDLER_URL!;
const serviceAccountEmail = process.env.SERVICE_ACCOUNT_EMAIL!;

const queuePath = client.queuePath(project, location, queue);

export async function createCloudTask(email: string, action: string, delayInSeconds = 120) {
  const taskId = uuid();
  const scheduleTime = {
    seconds: Math.floor(Date.now() / 1000) + delayInSeconds,
  };

 const payload = {
    taskId,
    payload: { email, action },  
  };


  const task = {
    parent: queuePath,
    task: {
      name: `${queuePath}/tasks/${taskId}`,
      httpRequest: {
        httpMethod: 'POST',
        url: handlerUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        oidcToken: {
          serviceAccountEmail,
        },
        body: Buffer.from(JSON.stringify(payload)).toString('base64'),
      },
      scheduleTime,
    },
  };

  const response = await client.createTask(task);

  console.log(`✅ Task created: ${response?.[0]?.name} scheduled at ${response?.[0]?.scheduleTime?.seconds}`);
  return response?.[0];
}
