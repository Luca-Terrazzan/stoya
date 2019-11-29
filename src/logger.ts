
export class Logger {

  public static log(message: any) {
    console.log(message);
  }

  public static error(message: any) {
    console.error(message);
  }

  public static logRepositoryMessage(repo: string, message: any) {
    if (!Logger.logStack[repo]) {
      Logger.logStack[repo] = [];
    }
    Logger.logStack[repo].push(message);
  }

  public static getRepositoryLog(repo: string): any[] {
    return Logger.logStack[repo] || [];
  }

  public static printLogbookToConsole() {
    for (const repo of Object.keys(Logger.logStack)) {
      console.log(`\nLogging repo ${repo.bold}`);
      for (const message of Logger.logStack[repo]) {
        console.log(`    ${message}`);
      }
    }
  }

  private static logStack: {[repo: string]: any[]} = {};

}
