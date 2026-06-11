import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clearSession, getMe, login, register } from "@/services/auth";

export function hasAccessToken() {
  return typeof window !== "undefined" && Boolean(window.localStorage.getItem("access_token"));
}

export function useCurrentSession() {
  return useQuery({
    queryKey: ["current-session"],
    queryFn: getMe,
    enabled: hasAccessToken(),
    retry: false
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (session) => queryClient.setQueryData(["current-session"], session)
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: (session) => queryClient.setQueryData(["current-session"], session)
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return () => {
    clearSession();
    queryClient.clear();
  };
}
