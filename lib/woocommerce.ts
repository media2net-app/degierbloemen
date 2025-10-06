import { WooCommerceProduct, WooCommerceOrder, WooCommerceCustomer } from '@/types/woocommerce'

export class WooCommerceAPI {
  private baseUrl: string
  private consumerKey: string
  private consumerSecret: string

  constructor(baseUrl: string, consumerKey: string, consumerSecret: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '') // Remove trailing slash
    this.consumerKey = consumerKey
    this.consumerSecret = consumerSecret
  }

  private async makeRequest<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any): Promise<T> {
    const url = `${this.baseUrl}/wp-json/wc/v3${endpoint}`
    
    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64')
    
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    }

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)
      
      if (!response.ok) {
        throw new Error(`WooCommerce API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('WooCommerce API Request failed:', error)
      throw error
    }
  }

  // Products
  async getProducts(params?: {
    page?: number
    per_page?: number
    search?: string
    category?: string
    status?: 'any' | 'draft' | 'pending' | 'private' | 'publish'
    stock_status?: 'instock' | 'outofstock' | 'onbackorder'
  }): Promise<WooCommerceProduct[]> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.makeRequest<WooCommerceProduct[]>(endpoint)
  }

  async getProduct(id: number): Promise<WooCommerceProduct> {
    return this.makeRequest<WooCommerceProduct>(`/products/${id}`)
  }

  async updateProduct(id: number, data: Partial<WooCommerceProduct>): Promise<WooCommerceProduct> {
    return this.makeRequest<WooCommerceProduct>(`/products/${id}`, 'PUT', data)
  }

  // Orders
  async getOrders(params?: {
    page?: number
    per_page?: number
    status?: string
    customer?: number
    product?: number
    after?: string
    before?: string
  }): Promise<WooCommerceOrder[]> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.makeRequest<WooCommerceOrder[]>(endpoint)
  }

  async getOrder(id: number): Promise<WooCommerceOrder> {
    return this.makeRequest<WooCommerceOrder>(`/orders/${id}`)
  }

  async updateOrderStatus(id: number, status: string): Promise<WooCommerceOrder> {
    return this.makeRequest<WooCommerceOrder>(`/orders/${id}`, 'PUT', { status })
  }

  // Customers
  async getCustomers(params?: {
    page?: number
    per_page?: number
    search?: string
    email?: string
  }): Promise<WooCommerceCustomer[]> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/customers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.makeRequest<WooCommerceCustomer[]>(endpoint)
  }

  async getCustomer(id: number): Promise<WooCommerceCustomer> {
    return this.makeRequest<WooCommerceCustomer>(`/customers/${id}`)
  }

  // Categories
  async getCategories(): Promise<any[]> {
    return this.makeRequest<any[]>('/products/categories')
  }

  // Reports
  async getSalesReport(params?: {
    period?: 'day' | 'week' | 'month' | 'last_month' | 'year'
    date_min?: string
    date_max?: string
  }): Promise<any> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/reports/sales${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.makeRequest<any>(endpoint)
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/products?per_page=1')
      return true
    } catch (error) {
      console.error('WooCommerce connection test failed:', error)
      return false
    }
  }
}

// Singleton instance
let wooCommerceAPI: WooCommerceAPI | null = null

export function getWooCommerceAPI(): WooCommerceAPI {
  if (!wooCommerceAPI) {
    const baseUrl = process.env.WOOCOMMERCE_BASE_URL || ''
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || ''
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || ''
    
    if (!baseUrl || !consumerKey || !consumerSecret) {
      throw new Error('WooCommerce API credentials not configured. Please set WOOCOMMERCE_BASE_URL, WOOCOMMERCE_CONSUMER_KEY, and WOOCOMMERCE_CONSUMER_SECRET environment variables.')
    }
    
    wooCommerceAPI = new WooCommerceAPI(baseUrl, consumerKey, consumerSecret)
  }
  
  return wooCommerceAPI
}
