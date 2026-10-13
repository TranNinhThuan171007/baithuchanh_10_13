Vue.createApp({
  data() {
    return {
      tuKhoa: '',
      cart: [],
      products: [
        { id: 1, ten: 'iPhone 15 Pro Max', gia: 32990000, anh: '../images/iphone-15-pro-max.jpg', moTa: 'Titan tự nhiên · 256 GB', loai: 'Điện thoại', nhan: 'Nổi bật' },
        { id: 2, ten: 'Samsung Galaxy S24 Ultra', gia: 28990000, anh: '../images/samsung-galaxy-s24-ultra.jpg', moTa: 'AI thông minh · 256 GB', loai: 'Điện thoại', nhan: 'Mới' },
        { id: 3, ten: 'Tai nghe AirPods 3', gia: 4490000, anh: '../images/airpods-3.jpg', moTa: 'Âm thanh không gian · MagSafe', loai: 'Âm thanh', nhan: 'Bán chạy' },
        { id: 4, ten: 'Sạc nhanh Anker 20W', gia: 490000, anh: '../images/anker-20w-charger.jpg', moTa: 'Nhỏ gọn · Sạc nhanh PowerIQ', loai: 'Phụ kiện', nhan: '' },
        { id: 5, ten: 'Ốp lưng MagSafe trong', gia: 890000, anh: '../images/magsafe-case.jpg', moTa: 'Trong suốt · Tương thích MagSafe', loai: 'Phụ kiện', nhan: 'Được yêu thích' },
        { id: 6, ten: 'Cáp USB-C bọc dù 1m', gia: 350000, anh: '../images/usb-c-cable.jpg', moTa: 'Sạc nhanh 60W · Bền bỉ mỗi ngày', loai: 'Phụ kiện', nhan: '' },
        { id: 7, ten: 'Apple Watch Series 9', gia: 9990000, anh: '../images/apple-watch-series-9.jpg', moTa: 'GPS · Theo dõi sức khỏe', loai: 'Thiết bị đeo', nhan: 'Ưu đãi' },
        { id: 8, ten: 'Loa Bluetooth JBL Go 4', gia: 1190000, anh: '../images/jbl-go-4-speaker.jpg', moTa: 'Âm thanh JBL Pro · Chống nước', loai: 'Âm thanh', nhan: '' }
      ]
    };
  },
  methods: {
    // Thêm bản sao riêng vào giỏ để cùng một sản phẩm có thể được chọn nhiều lần.
    themVaoGio(product) {
      this.cart.push({ ...product, cartId: `${product.id}-${Date.now()}-${Math.random()}` });
    },
    // Xóa đúng món ở vị trí được chọn; Vue sẽ tự cập nhật danh sách và tổng tiền.
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
    },
    // Hiển thị giá theo quy ước tiền Việt Nam, không có phần thập phân.
    dinhDangTien(soTien) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(soTien);
    },
    // Thông báo trạng thái mẫu cho nút thanh toán khi chưa kết nối cổng thanh toán.
    thanhToan() {
      if (this.cart.length > 0) window.alert('Cảm ơn bạn! Đơn hàng của bạn đã sẵn sàng để thanh toán.');
    }
  },
  computed: {
    // Tổng số món đang có trong giỏ, dùng để cập nhật huy hiệu trên thanh điều hướng.
    cartCount() {
      return this.cart.length;
    },
    // Cộng giá từng món bằng reduce để tạo giá trị tạm tính của đơn hàng.
    tongTien() {
      return this.cart.reduce((tong, item) => tong + item.gia, 0);
    },
    // Lọc tên, mô tả và loại sản phẩm không phân biệt chữ hoa hoặc chữ thường.
    danhSachLoc() {
      const tuKhoaChuanHoa = this.tuKhoa.trim().toLocaleLowerCase('vi');
      if (!tuKhoaChuanHoa) return this.products;
      return this.products.filter((item) => `${item.ten} ${item.moTa} ${item.loai}`.toLocaleLowerCase('vi').includes(tuKhoaChuanHoa));
    }
  }
}).mount('#app');

// Nếu dùng Vanilla JS, mỗi lần thêm/xóa giỏ hàng phải tự querySelector + cập nhật DOM thủ công - Vue tự động làm điều này nhờ tính năng Reactivity.
