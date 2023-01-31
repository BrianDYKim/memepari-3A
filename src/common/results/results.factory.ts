import { Result } from "./results";

export class ResultFactory {
    /**
     * 반환에 성공한 response body를 반환하는 메소드
     * @param {T} data 반환 데이터
     * @returns {Result<T>} successResult
     */
    static getSuccessResult<T>(data: T): Result<T> {
        return Result.of(data);
    }

    static getFailureResult(error: string): Result<any> {
        return Result.of(null, error);
    }
}