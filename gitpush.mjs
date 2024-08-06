import { exec } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите комментарий к коммиту: ', (commitMessage) => {
  rl.close();
  const commands = [
    'git add .',
    `git commit -m "${commitMessage}"`,
    'git push'
  ];

  exec(commands.join(' && '), (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  });
});
