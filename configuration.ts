import { readFileSync, existsSync } from 'fs';
import * as yaml from 'js-yaml';
import { merge } from 'lodash';
import { join } from 'path';

type Config = {
  redis: {
    host: string;
    port: number;
    password: string;
    db: number;
  };
  logger: {
    level: string;
    maxFiles: number;
  };
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    logging: boolean;
  };
};

const YAML_CONFIG_FILENAME = 'bootstrap';
const YAML_CONFIG_SUFFIX = 'yaml';

const cwd = process.cwd();
let config: Config = null;

// load config.yaml
const commonCfgPath = join(
  cwd,
  `${YAML_CONFIG_FILENAME}.${YAML_CONFIG_SUFFIX}`,
);
if (existsSync(commonCfgPath))
  config = yaml.load(readFileSync(commonCfgPath, 'utf8')) as Config;
// load config-${NODE_ENV}.yaml, like config-dev.yaml
const envCfgPath = join(
  cwd,
  `${YAML_CONFIG_FILENAME}-${process.env.NODE_ENV}.${YAML_CONFIG_SUFFIX}`,
);
if (existsSync(envCfgPath)) {
  merge(config, yaml.load(readFileSync(envCfgPath, 'utf8')));
}

export const redisConfig = config.redis;

export const loggerConfig = config.logger;

export const dbConfig = config.db;
