export class Result<T> {
    error: string | null;
    data?: T | null;

    private constructor(data: T | null, error?: string | null) {
        this.data = data;
        this.error = error;
    }

    static of<T>(data: T | null, error?: string | null) {
        return new Result(data, error);
    }
}