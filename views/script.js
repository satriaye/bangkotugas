  function showSuccessMessage() {
    alert("Data berhasil dikirim ke Kepegawaian!"); // Menampilkan notifikasi popup
  }

  // Inisialisasi date picker untuk Form Hari
  document.addEventListener("DOMContentLoaded", function () {
    var harimulaiFlatpickr = flatpickr("#harimulai", {
      dateFormat: "l, d F Y", // Format tanggal Indonesia
      locale: "id", // Atur bahasa ke bahasa Indonesia
      onClose: function (selectedDates, dateStr, instance) {
        var formattedDate = instance.formatDate(selectedDates[0], "l, d F Y");
        $("#harimulai").val(formattedDate);

        // Mengatur tanggal minimum untuk "Hari Selesai" setelah memilih tanggal untuk "Hari Mulai"
        hariselesaiFlatpickr.set("minDate", selectedDates[0]);

        // Aktifkan input field "Hari Selesai" hanya jika "Hari Mulai" sudah terisi
        if ($("#harimulai").val() !== "") {
          hariselesaiFlatpickr.set("disabled", false);
        } else {
          hariselesaiFlatpickr.clear(); // Bersihkan nilai "Hari Selesai" jika "Hari Mulai" dikosongkan
          hariselesaiFlatpickr.set("disabled",
            true); // Nonaktifkan input field "Hari Selesai" jika "Hari Mulai" dikosongkan
        }
      }
    });

    var hariselesaiFlatpickr = flatpickr("#hariselesai", {
      dateFormat: "l, d F Y", // Format tanggal Indonesia
      locale: "id", // Atur bahasa ke bahasa Indonesia
      onClose: function (selectedDates, dateStr, instance) {
        var formattedDate = instance.formatDate(selectedDates[0], "l, d F Y");
        $("#hariselesai").val(formattedDate);

        // Hitung lama hari
        var startDate = harimulaiFlatpickr.selectedDates[0];
        var endDate = selectedDates[0];
        var diffTime = Math.abs(endDate - startDate);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Set nilai lama hari
        $("#lama").val(diffDays + 1); // Ditambah 1 karena mulai dan selesai dihitung sebagai 1 hari

        // Jika tanggal selesai belum dipilih, nonaktifkan input lama hari
        if (!endDate) {
          $("#lama").val('');
          $("#lama").prop('readonly', true);
        } else {

        }
      }
    });






    // Nonaktifkan input field "Hari Selesai" secara default
    hariselesaiFlatpickr.set("disabled", true);
  });
  // Inisialisasi time picker untuk form waktu
  document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#waktuDari", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i", // Format waktu
    });

    flatpickr("#waktuSampai", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i", // Format waktu
    });
  });

  // Daftar pilihan autocomplete
  document.addEventListener("DOMContentLoaded", function () {
    $("#nama").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: '/getAutocompleteOptions', // Ubah URL ke endpoint yang sesuai pada index.js
          dataType: "json",
          data: {
            term: request.term
          },
          success: function (data) {
            response(data);
          }
        });
      },
      minLength: 1,
      select: function (event, ui) {
        $("#nip").val(ui.item.nip); // Isi otomatis form nip
        $("#pangkat").val(ui.item.pangkat);
        $("#jabatan").val(ui.item.jabatan); // Isi otomatis form pangkat
      }
    });
  });




  //HANDLE OVERLAPPING DATES TANGGAL DAN TEMPAT
  function handleCekTanggal() {
    var harimulai = $("#harimulai").val();
    var hariselesai = $("#hariselesai").val();
    var tempat = $("#tempat").val();

    // Buat objek data yang akan dikirim
    var formData = new URLSearchParams();
    formData.append('harimulai', harimulai);
    formData.append('hariselesai', hariselesai);
    formData.append('tempat', tempat);

    // Kirim data ke endpoint /checkDates menggunakan metode POST
    fetch("/checkDates", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.overlapping) {
          Swal.fire('Peringatan!', `Anda berada di tempat dan rentang waktu yang sama dengan ${data.overlappingName} dkk.
    Koordinasikan terkait transportasi dan akomodasi agar lebih efisien`,
            'warning');
        } else {
          Swal.fire('OK!', 'Hanya anda dan rombongan yang berangkat ke tempat dari jadwal yang ditentukan',
            'success');
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }





  //SweetAlert2
  function handleBuatRPD() {
    // Periksa apakah semua input form telah diisi
    var isAllFilled = true;
    $("#myForm .form-control").each(function () {
      if ($(this).val() === "" && $(this).prop('required')) {
        isAllFilled = false;
      }
    });

    // Jika ada input yang belum diisi, tampilkan notifikasi
    if (!isAllFilled) {
      Swal.fire({
        title: 'Perhatian!',
        text: 'Silakan isi semua field yang diperlukan sebelum melanjutkan.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
    } else {
      // Jika semua input telah diisi, tampilkan SweetAlert untuk konfirmasi
      Swal.fire({
        title: 'Cek dulu hasil RPD nya sudah betul belum?',
        html: '<p style="font-size: 14px; color: #6c757d;">Klik kirim akan mengirim ke Kepegawaian. Anda tetap diwajibkan buat RPD di nadine dengan dibantu pakai format yang terdownload.</p>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Syudah, kirim ya',
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#d33",
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          // Jika pengguna mengkonfirmasi, lanjutkan dengan submit form atau tindakan berikutnya
          submitForm(); // Pastikan ini adalah fungsi yang benar untuk mengirim form
        }
      });
    }
  }

  //SUBMIT GOOGLESHEETS
  function submitForm() {
    var nama = $("#nama").val();
    var nip = $("#nip").val();
    var pangkat = $("#pangkat").val();
    var jabatan = $("#jabatan").val();
    var harimulai = $("#harimulai").val();
    var hariselesai = $("#hariselesai").val();
    var waktuDari = $("#waktuDari").val();
    var waktuSampai = $("#waktuSampai").val();
    var alamat = $("#alamat").val();
    var tempat = $("#tempat").val();
    var lama = $("#lama").val();
    var agenda = $("#agenda").val();
    var output = $("#output").val();
    var tanggalKirim = new Date().toISOString().slice(0, 10);

    // Buat objek data yang akan dikirim
    var formData = new URLSearchParams();
    formData.append('nama', nama);
    formData.append('nip', nip);
    formData.append('pangkat', pangkat);
    formData.append('jabatan', jabatan);
    formData.append('harimulai', harimulai);
    formData.append('hariselesai', hariselesai);
    formData.append('waktuDari', waktuDari);
    formData.append('waktuSampai', waktuSampai);
    formData.append('alamat', alamat);
    formData.append('tempat', tempat);
    formData.append('lama', lama);
    formData.append('agenda', agenda);
    formData.append('output', output);
    formData.append('tanggalKirim', tanggalKirim);

    // Kirim data ke endpoint /sendtosheets menggunakan metode POST
    fetch("/sendtosheets", {
        method: "POST",
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        showSuccessMessage(); // Memanggil fungsi notifikasi
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  function showSuccessMessage() {
    Swal.fire({
      title: 'Berhasil!',
      text: 'Data berhasil dikirim ke Kepegawaian.',
      icon: 'success'
    });
  }