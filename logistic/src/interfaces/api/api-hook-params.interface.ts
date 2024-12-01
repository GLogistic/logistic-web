export interface IApiHookParams {
    onSuccess?: ((data: any, variables: any, context: unknown) => Promise<unknown> | unknown) | undefined;
}