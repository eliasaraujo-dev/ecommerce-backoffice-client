import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export class ApiService {
  private static instance: ApiService;
  private axiosClient: AxiosInstance;

  private constructor() {
    this.axiosClient = axios.create({
      // Em produção, isso viria do seu arquivo .env (ex: import.meta.env.VITE_API_URL)
      baseURL: 'http://localhost:8080/api/v1',
      timeout: 10000, // Aborta a requisição se demorar mais de 10 segundos
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeInterceptors();
  }

  // Método global para acessar a API.
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Configuração dos Interceptadores
  private initializeInterceptors() {
    this.axiosClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Busca o token do localStorage (ou do seu gerenciador de estado)
        const token = localStorage.getItem('@Backoffice:token');
        
        if (token && config.headers) {
          // Injeta o token no cabeçalho de Autorização
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercepta TODA resposta ANTES de chegar no componente
    this.axiosClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Tratamento global de erros (ex: Token expirou)
        if (error.response && error.response.status === 401) {
          console.error('Sessão expirada. Deslogando usuário...');
          // Aqui você chamaria a função para limpar o localStorage e redirecionar para o Login
        }
        return Promise.reject(error);
      }
    );
  }

  public get client(): AxiosInstance {
    return this.axiosClient;
  }
}

export const api = ApiService.getInstance().client;