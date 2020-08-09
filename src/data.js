const itemData = [
  {
    id: 1, name: '신라면', price: 1000, category: '라면'
  },
  {
    id: 2, name: '월드콘', price: 1500, category: '아이스크림'
  },
  {
    id: 3, name: '돼지바', price: 1000, category: '아이스크림'
  },
  {
    id: 4, name: '초코첵스', price: 6000, category: '시리얼'
  },
  {
    id: 5, name: '서울우유', price: 3000, category: '우유'
  },
  {
    id: 6, name: '스윙칩', price: 2000, category: '과자'
  },
  {
    id: 7, name: '몽쉘', price: 3500, category: '과자'
  },
  {
    id: 8, name: '짜파게티', price: 1000, category: '라면'
  },
  {
    id: 9, name: '바나나우유', price: 1200, category: '우유'
  },
  {
    id: 10, name: '붕어싸만코', price: 1500, category: '아이스크림'
  }
]

const orderData = [
  { id: 1, user_id: 1 },
  { id: 2, user_id: 2 },
  { id: 3, user_id: 1 },
  { id: 4, user_id: 3 }
]

const userData = [
  { id: 1, name: '이승엽' },
  { id: 2, name: '류현진' },
  { id: 3, name: '오승환' }
]

const orderItemData = [
  {
    id: 1, order_id: 1, item_id: 1, quantity: 1
  },
  {
    id: 2, order_id: 1, item_id: 8, quantity: 2
  },
  {
    id: 3, order_id: 2, item_id: 1, quantity: 1
  },
  {
    id: 4, order_id: 2, item_id: 2, quantity: 3
  },
  {
    id: 5, order_id: 2, item_id: 7, quantity: 5
  },
  {
    id: 6, order_id: 2, item_id: 9, quantity: 1
  },
  {
    id: 7, order_id: 4, item_id: 5, quantity: 10
  },
  {
    id: 8, order_id: 3, item_id: 5, quantity: 7
  },
  {
    id: 8, order_id: 3, item_id: 4, quantity: 6
  }
]

module.exports = {
  userData,
  itemData,
  orderData,
  orderItemData
}
