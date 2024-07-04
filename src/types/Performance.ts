declare namespace PerformanceLogger {
  export type Request = {
    url?: string;
    method?: string;
    startTime: number;
    endTime: number;
    duration: number;
    status?: number;
    code?: number;
    message?: string;
    msg?: string;
  };
}
