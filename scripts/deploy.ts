import * as Utils from './utils';

export interface DeployConfigs {
  devAPIURL: string;
  prodAPIURL: string;
  sharedBuildDir: string;
  clientBuildDir: string;
  clientDeployPath: string;
  serverBuildDir: string;
}

export async function getConfigs(): Promise<DeployConfigs> {
  let configPath = Utils.joinPath(Utils.PROJECT_DIR, 'deploy.json');

  return Utils.parseConfig<DeployConfigs>(configPath);
}

export async function installDependencies(): Promise<void> {
  await Utils.exec('yarn install', Utils.PROJECT_DIR);
}

export async function replaceVariables(
  configs: DeployConfigs,
): Promise<() => Promise<void>> {
  const API_SERVICE_PATH = Utils.joinPath(
    Utils.CLIENT_PROJECT_DIR,
    'src',
    'services',
    'api-service.ts',
  );

  return Utils.replaceFileContent(
    API_SERVICE_PATH,
    configs.devAPIURL,
    configs.prodAPIURL,
  );
}

export async function buildShared(_configs: DeployConfigs): Promise<void> {
  let execOut = await Utils.exec('yarn build', Utils.SHARED_PROJECT_DIR);

  if (execOut.stderr) {
    throw new Error(execOut.stderr);
  }
}

export async function cleanClientBuild(configs: DeployConfigs): Promise<void> {
  await Utils.deleteFile(configs.clientBuildDir);
}

export async function buildClient(_configs: DeployConfigs): Promise<void> {
  let execOut = await Utils.exec('yarn build', Utils.CLIENT_PROJECT_DIR);

  if (execOut.stderr) {
    throw new Error(execOut.stderr);
  }
}

export async function moveClientBuild(configs: DeployConfigs): Promise<void> {
  let clientBuildPath = Utils.joinPath(
    Utils.CLIENT_PROJECT_DIR,
    configs.clientBuildDir,
  );

  await Utils.deleteFile(configs.clientDeployPath);

  await Utils.renameFile(clientBuildPath, configs.clientDeployPath);
}

export async function cleanServerBuild(configs: DeployConfigs): Promise<void> {
  let serverBuildPath = Utils.joinPath(
    Utils.SERVER_PROJECT_DIR,
    configs.serverBuildDir,
  );

  await Utils.deleteFile(serverBuildPath);
}

export async function buildServer(_configs: DeployConfigs): Promise<void> {
  let execOut = await Utils.exec('yarn tsc', Utils.SERVER_PROJECT_DIR);

  if (execOut.stderr) {
    throw new Error(execOut.stderr);
  }
}

export async function stopServer(_configs: DeployConfigs): Promise<void> {
  try {
    await Utils.exec('pm2 stop librarian');
  } catch (error) {}

  try {
    await Utils.exec('pm2 delete librarian');
  } catch (error) {}
}

export async function startServer(configs: DeployConfigs): Promise<void> {
  let serverEntrancePath = Utils.joinPath(
    Utils.SERVER_PROJECT_DIR,
    configs.serverBuildDir,
    'main.js',
  );

  await Utils.exec(
    `pm2 start ${serverEntrancePath} --name="librarian"`,
    Utils.SERVER_PROJECT_DIR,
  );
}

export async function deploy(): Promise<void> {
  console.info('================ Deployment Started =================');

  console.info('Reading deploy configuration...');
  let configs = await getConfigs();

  console.info('Installing dependencies...');

  await installDependencies();

  console.info('Building shared side...');

  await buildShared(configs);

  // console.info('Replacing environment variables...');

  // let restoreVariables = await replaceVariables(configs);

  // console.info('Cleaning old client build...');

  // await cleanClientBuild(configs);

  // console.info('Building client side...');

  // await buildClient(configs);

  // console.info('moving client build files...');

  // await moveClientBuild(configs);

  // console.info('Restoring environment variables...');

  // await restoreVariables();

  console.info('Cleaning old server build...');

  await cleanServerBuild(configs);

  console.info('Building server side...');

  await buildServer(configs);

  console.info('Stopping server...');

  await stopServer(configs);

  console.info('Starting server...');

  await startServer(configs);

  console.info('Deployment finished.');
}

deploy().catch(console.error);
