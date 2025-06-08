import {useCallback, useEffect, useRef, useState} from "react";

interface IUseAPIOptions<TParams> {
    manual?: boolean;
    params?: TParams;
    deps?: any[];
}


type UseApiReturn<TData, TError> = {
    data: TData | null;
    error: TError | null;
    loading: boolean;
    refetch: () => void;
    cancel: () => void;
};

export type IApiFn = <TData = any, TError = any, TParams = any>(params?: TParams, signal?: AbortSignal) => Promise<TData>;

export type IUseAPI<TData = any, TError = any, TParams = any> = (
    apiFn: IApiFn,
    options?: IUseAPIOptions<TParams>
) => UseApiReturn<TData, TError>


export const useAPI: IUseAPI = <TData = any, TError = any, TParams = any>(apiFn: IApiFn, options: IUseAPIOptions<TParams> = {}) => {
    const {manual = false, params, deps = []} = options;
    const [data, setData] = useState<TData | null>(null);
    const [error, setError] = useState<TError | null>(null);
    const [loading, setLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const cancel = useCallback(() => {
        if (abortControllerRef.current)
            abortControllerRef.current.abort();
    }, [])

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null)
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        try {
            const result = await apiFn(params, signal);
            if (!signal.aborted) {
                setData(result);
            }
        } catch (err: any) {
            if (!signal.aborted) {
                setError(err);
            }
        } finally {
            if (!signal.aborted) {
                setLoading(false);
            }
        }
    }, [params, apiFn])

    useEffect(() => {
        if (!manual) {
            execute()
        }
        return () => cancel()
    }, [...deps, manual, execute]);


    return {
        data,
        loading,
        error,
        refetch: execute,
        cancel
    }
}