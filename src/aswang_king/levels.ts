let level = main => [
	[
		main.entity('text', {x:0, title:'Level 1'}),
		main.entity('plat', {x:240, y:128, w:15, h:7, dropoff: true, mode:0, clip:[[], [], [0, 1, 2, 3, 4, 5, 6], []]}),
		main.entity('plat', {x:0, y:224, w:18, h:1, mode:0, col:15, clip:[[], [], [], []]}),
		main.entity('plat', {x:352, y:176, w:8, h:4, mode:0, col:15, clip:[[], [], [0, 1, 2, 3], []]}),
	], [
		main.entity('plat', {x:480, y:128, w:4, h:7, dropoff: true, mode:0, clip:[[], [0, 1, 2, 3, 4, 5, 6], [], []]}),
		main.entity('plat', {x:928, y:176, w:2, h:4, dropoff: true, mode:0, clip:[[], [], [0, 1, 2, 3], []]}),
		main.entity('plat', {x:480, y:176, w:8, h:4, mode:0, col:15, clip:[[], [0, 1, 2, 3], [3], []]}),
		main.entity('plat', {x:608, y:224, w:22, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:648, y:176, w:4, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:656, y:72, w:9, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:760, y:152, w:8, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:880, y:104, w:5, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
		main.entity('pressure_plate', {x:776, y:150, w:64, bind:[
			main.entity('shooter', {x:875.0, y:109.0, bind:[], s:13, a:3.14159265359}),
		]}),
	], [
		main.entity('plat', {x:960, y:176, w:2, h:4, dropoff: true, mode:0, clip:[[], [0, 1, 2, 3], [], []]}),
		main.entity('plat', {x:960, y:104, w:2, h:1, dropoff: true, mode:0, clip:[[], [0], [], []]}),
		main.entity('plat', {x:960, y:224, w:20, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:1072, y:128, w:11, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:1280, y:192, w:2, h:3, mode:0, col:15, clip:[[], [2], [0, 1, 2], []]}),
		main.entity('plat', {x:1312, y:160, w:2, h:5, mode:0, col:15, clip:[[], [2, 3, 4], [0, 1, 2, 3, 4], []]}),
		main.entity('plat', {x:1344, y:128, w:2, h:7, mode:0, col:15, clip:[[], [2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6], []]}),
		main.entity('plat', {x:1376, y:96, w:2, h:9, mode:0, col:15, clip:[[], [2, 3, 4, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8], []]}),
		main.entity('plat', {x:1408, y:64, w:2, h:11, mode:0, col:15, clip:[[], [2, 3, 4, 5, 6, 7, 8, 9, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []]}),
	], [
		main.entity('plat', {x:1440, y:64, w:3, h:11, mode:0, col:15, clip:[[], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [10], []]}),
		main.entity('plat', {x:1488, y:224, w:27, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:1536, y:64, w:13, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:1792, y:120, w:8, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
	], [
		main.entity('plat', {x:1920, y:224, w:23, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:1920, y:120, w:5, h:1, dropoff: true, mode:0, clip:[[], [0], [], []]}),
		main.entity('plat', {x:2056, y:88, w:13, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:2288, y:208, w:7, h:2, mode:0, col:15, clip:[[], [1], [0, 1], []]}),
	], [
		main.entity('plat', {x:2400, y:208, w:8, h:2, mode:0, col:15, clip:[[], [0, 1], [0, 1], []]}),
		main.entity('plat', {x:2528, y:176, w:2, h:4, mode:0, col:15, clip:[[], [2, 3], [3], []]}),
		main.entity('plat', {x:2560, y:224, w:17, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:2764, y:40, w:2, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:2832, y:224, w:3, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:2840, y:168, w:1, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
	], [
		main.entity('plat', {x:2880, y:224, w:30, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:2904, y:136, w:1, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:2960, y:104, w:1, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:3032, y:88, w:3, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:3120, y:120, w:1, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:3184, y:96, w:3, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:3216, y:44, w:2, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:3280, y:136, w:1, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:3344, y:96, w:1, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
		main.entity('plat', {x:3352, y:168, w:0, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
	], [
		main.entity('plat', {x:3360, y:96, w:3, h:1, dropoff: true, mode:0, clip:[[], [0], [], []]}),
		main.entity('plat', {x:3360, y:168, w:0, h:1, dropoff: true, mode:0, clip:[[], [0], [], []]}),
		main.entity('plat', {x:3360, y:224, w:2, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:3392, y:224, w:16, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:3440, y:64, w:6, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
		main.entity('plat', {x:3536, y:48, w:2, h:2, dropoff: true, mode:0, clip:[[], [1], [], []]}),
		main.entity('plat', {x:3624, y:24, w:4, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:3648, y:176, w:2, h:4, mode:0, col:15, clip:[[], [3], [3], []]}),
		main.entity('plat', {x:3680, y:224, w:2, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:3712, y:160, w:2, h:5, mode:0, col:15, clip:[[], [4], [3, 4], []]}),
		main.entity('plat', {x:3744, y:208, w:2, h:2, mode:0, col:15, clip:[[], [0, 1], [0, 1], []]}),
		main.entity('plat', {x:3776, y:112, w:2, h:8, mode:0, col:15, clip:[[], [6, 7], [3, 4, 5, 6, 7], []]}),
		main.entity('plat', {x:3808, y:160, w:2, h:5, mode:0, col:15, clip:[[], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4], []]}),
		main.entity('pressure_plate', {x:3360, y:94, w:48, bind:[
			main.entity('shooter', {x:3435.0, y:69.0, bind:[], s:10, a:3.14159265359}),
		]}),
		main.entity('pressure_plate', {x:3788, y:110, w:16, bind:[
			main.entity('shooter', {x:3693.0, y:29.0, bind:[], s:10, a:0.0}),
		]}),
	], [
		main.entity('plat', {x:4224, y:112, w:6, h:8, dropoff: true, mode:0, clip:[[], [], [0, 1, 2, 3, 4, 5, 6, 7], []]}),
		main.entity('plat', {x:3840, y:96, w:2, h:9, mode:0, col:15, clip:[[], [4, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8], []]}),
		main.entity('plat', {x:3872, y:80, w:2, h:10, mode:0, col:15, clip:[[], [1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7, 8, 9], []]}),
		main.entity('plat', {x:3904, y:112, w:2, h:8, mode:0, col:15, clip:[[], [0, 1, 2, 3, 4, 5, 6, 7], [3, 4, 5, 6, 7], []]}),
		main.entity('plat', {x:3936, y:160, w:2, h:5, mode:0, col:15, clip:[[], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4], []]}),
		main.entity('plat', {x:3968, y:112, w:2, h:8, mode:0, col:15, clip:[[], [3, 4, 5, 6, 7], [7], []]}),
		main.entity('plat', {x:4000, y:224, w:20, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:4016, y:72, w:3, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:4080, y:48, w:7, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:4160, y:192, w:10, h:2, mode:0, col:15, clip:[[], [], [0, 1], []]}),
		main.entity('plat', {x:4192, y:144, w:8, h:2, dropoff: true, mode:0, clip:[[], [], [0, 1], []]}),
	], [
		main.entity('plat', {x:4320, y:112, w:2, h:8, dropoff: true, mode:0, clip:[[], [0, 1, 2, 3, 4, 5, 6, 7], [], []]}),
		main.entity('plat', {x:4320, y:224, w:7, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:4320, y:192, w:2, h:2, mode:0, col:15, clip:[[], [0, 1], [], []]}),
		main.entity('plat', {x:4320, y:144, w:2, h:2, dropoff: true, mode:0, clip:[[], [0, 1], [], []]}),
		main.entity('plat', {x:4432, y:128, w:2, h:7, mode:0, col:15, clip:[[], [6], [6], []]}),
		main.entity('plat', {x:4464, y:224, w:2, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:4496, y:176, w:2, h:4, mode:0, col:15, clip:[[], [3], [3], []]}),
		main.entity('plat', {x:4528, y:224, w:2, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:4560, y:112, w:2, h:8, mode:0, col:15, clip:[[], [7], [4, 5, 6, 7], []]}),
		main.entity('plat', {x:4592, y:176, w:2, h:4, mode:0, col:15, clip:[[], [0, 1, 2, 3], [0, 1, 2, 3], []]}),
		main.entity('plat', {x:4624, y:96, w:2, h:9, mode:0, col:15, clip:[[], [5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8], []]}),
		main.entity('plat', {x:4656, y:80, w:2, h:10, mode:0, col:15, clip:[[], [1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7, 8, 9], []]}),
		main.entity('plat', {x:4688, y:112, w:2, h:8, mode:0, col:15, clip:[[], [0, 1, 2, 3, 4, 5, 6, 7], [6, 7], []]}),
		main.entity('plat', {x:4720, y:208, w:2, h:2, mode:0, col:15, clip:[[], [0, 1], [1], []]}),
		main.entity('plat', {x:4752, y:224, w:3, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:4768, y:96, w:2, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
	], [
		main.entity('plat', {x:4800, y:224, w:30, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:4800, y:96, w:8, h:1, dropoff: true, mode:0, clip:[[], [0], [], []]}),
		main.entity('plat', {x:4984, y:136, w:10, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:5200, y:104, w:5, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
		main.entity('pressure_plate', {x:5096, y:134, w:32, bind:[
			main.entity('shooter', {x:5195.0, y:109.0, bind:[], s:17, a:3.14159265359}),
		]}),
	], [
		main.entity('plat', {x:5632, y:176, w:4, h:4, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:5280, y:224, w:6, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:5280, y:104, w:5, h:1, dropoff: true, mode:0, clip:[[], [0], [], []]}),
		main.entity('plat', {x:5376, y:224, w:24, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:5744, y:72, w:1, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
	], [
		main.entity('plat', {x:5920, y:176, w:2, h:4, dropoff: true, mode:0, clip:[[], [], [0, 1, 2, 3], []]}),
		main.entity('plat', {x:5952, y:144, w:2, h:6, dropoff: true, mode:0, clip:[[], [2, 3, 4, 5], [], []]}),
		main.entity('plat', {x:6192, y:176, w:2, h:4, dropoff: true, mode:0, clip:[[], [], [0, 1, 2, 3], []]}),
		main.entity('plat', {x:6224, y:144, w:1, h:6, dropoff: true, mode:0, clip:[[], [2, 3, 4, 5], [0, 1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:5760, y:72, w:1, h:1, dropoff: true, mode:0, clip:[[], [0], [], []]}),
		main.entity('plat', {x:5760, y:224, w:30, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
	], [
		main.entity('plat', {x:6240, y:144, w:1, h:6, dropoff: true, mode:0, clip:[[], [0, 1, 2, 3, 4, 5], [], []]}),
		main.entity('plat', {x:6240, y:224, w:12, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:6432, y:192, w:2, h:3, mode:0, col:15, clip:[[], [2], [0, 1, 2], []]}),
		main.entity('plat', {x:6464, y:160, w:2, h:5, mode:0, col:15, clip:[[], [2, 3, 4], [0, 1, 2, 3, 4], []]}),
		main.entity('plat', {x:6496, y:128, w:2, h:7, mode:0, col:15, clip:[[], [2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6], []]}),
		main.entity('plat', {x:6528, y:96, w:2, h:9, mode:0, col:15, clip:[[], [2, 3, 4, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8], []]}),
		main.entity('plat', {x:6560, y:64, w:2, h:11, mode:0, col:15, clip:[[], [2, 3, 4, 5, 6, 7, 8, 9, 10], [10], []]}),
		main.entity('plat', {x:6592, y:224, w:8, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:6656, y:44, w:1, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
	], [
		main.entity('plat', {x:6736, y:64, w:11, h:11, dropoff: true, mode:0, clip:[[], [], [2, 3, 4, 5, 6, 7, 8, 9, 10], []]}),
		main.entity('plat', {x:6912, y:96, w:3, h:9, dropoff: true, mode:0, clip:[[], [0, 1, 2, 3, 4, 5, 6, 7, 8], [], []]}),
		main.entity('plat', {x:6720, y:224, w:18, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:6752, y:144, w:8, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:6800, y:96, w:7, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:6800, y:192, w:6, h:1, mode:0, dropoff: true, clip:[[], [], [], []]}),
		main.entity('plat', {x:7008, y:112, w:1, h:8, mode:0, col:15, clip:[[], [7], [7], []]}),
		main.entity('plat', {x:7024, y:224, w:3, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:7072, y:144, w:1, h:6, mode:0, col:15, clip:[[], [5], [5], []]}),
		main.entity('plat', {x:7088, y:224, w:3, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:7136, y:176, w:1, h:4, mode:0, col:15, clip:[[], [3], [3], []]}),
		main.entity('plat', {x:7152, y:224, w:3, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
	], [
		main.entity('plat', {x:7200, y:224, w:30, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:7264, y:144, w:8, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:7456, y:104, w:8, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
	], [
		main.entity('plat', {x:7680, y:0, w:2, h:10, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:7680, y:224, w:20, h:1, mode:0, col:15, clip:[[], [0], [], []]}),
	], [
		main.entity('text', {x:8000, title:'Level 2'}),
		main.entity('plat', {x:8000, y:224, w:13, h:1, mode:2, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:8208, y:192, w:5, h:3, mode:2, col:15, clip:[[], [2], [2], []]}),
		main.entity('plat', {x:8288, y:224, w:12, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:8360, y:104, w:7, h:1, dropoff: true, mode:2, clip:[[], [], [], []]}),
		main.entity('plat', {x:8368, y:176, w:7, h:1, dropoff: true, mode:2, clip:[[], [], [], []]}),
		main.entity('wire', {x:8220, y:164, h:36, bind:[
			main.entity('shooter', {x:8355.0, y:109.0, bind:[], s:10, a:3.14159265359}),
		]}),
	], [
		main.entity('plat', {x:8480, y:224, w:12, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:8528, y:136, w:7, h:1, dropoff: true, mode:2, clip:[[], [], [], []]}),
		main.entity('plat', {x:8672, y:192, w:5, h:3, mode:2, col:15, clip:[[], [2], [0, 1, 2], []]}),
		main.entity('plat', {x:8752, y:176, w:1, h:4, mode:2, col:15, clip:[[], [1, 2, 3], [0, 1, 2, 3], []]}),
		main.entity('plat', {x:8768, y:160, w:2, h:5, mode:2, col:15, clip:[[], [1, 2, 3, 4], [1, 4], []]}),
		main.entity('plat', {x:8800, y:176, w:2, h:1, dropoff: true, mode:2, clip:[[], [0], [], []]}),
		main.entity('plat', {x:8800, y:224, w:10, h:1, clip:[[], [0], [0], []]}),
		main.entity('vine', {x:8844, y:0, h:132}),
		main.entity('vine', {x:8927, y:0, h:92}),
	], [
		main.entity('plat', {x:8960, y:224, w:22, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:9280, y:176, w:2, h:1, dropoff: true, mode:2, clip:[[], [], [0], []]}),
		main.entity('plat', {x:9312, y:128, w:8, h:7, mode:2, col:15, clip:[[], [6, 3], [3, 6], []]}),
		main.entity('vine', {x:9010, y:0, h:148}),
		main.entity('vine', {x:9093, y:0, h:60}),
		main.entity('vine', {x:9176, y:0, h:112}),
		main.entity('vine', {x:9260, y:0, h:92}),
	], [
		main.entity('plat', {x:9440, y:176, w:2, h:1, dropoff: true, mode:2, clip:[[], [0], [], []]}),
		main.entity('plat', {x:9440, y:224, w:30, h:1, clip:[[], [0], [0], []]}),
		main.entity('vine', {x:9484, y:0, h:156}),
		main.entity('vine', {x:9572, y:0, h:80}),
		main.entity('vine', {x:9660, y:0, h:104}),
		main.entity('vine', {x:9748, y:0, h:28}),
		main.entity('vine', {x:9836, y:0, h:124}),
	], [
		main.entity('plat', {x:9920, y:224, w:3, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:9936, y:176, w:2, h:1, dropoff: true, mode:2, clip:[[], [], [0], []]}),
		main.entity('plat', {x:9968, y:128, w:4, h:7, mode:2, col:15, clip:[[], [6, 3], [2, 3, 4, 5, 6], []]}),
		main.entity('plat', {x:10032, y:160, w:2, h:5, mode:2, col:15, clip:[[], [0, 1, 2, 3, 4], [2, 3, 4], []]}),
		main.entity('plat', {x:10064, y:192, w:2, h:3, mode:2, col:15, clip:[[], [0, 1, 2], [1, 2], []]}),
		main.entity('plat', {x:10096, y:208, w:2, h:2, mode:2, col:15, clip:[[], [0, 1], [1], []]}),
		main.entity('plat', {x:10128, y:224, w:17, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:10176, y:152, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10272, y:128, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10368, y:112, w:2, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('vine', {x:9924, y:0, h:76}),
	], [
		main.entity('plat', {x:10400, y:112, w:1, h:1, dropoff: true, mode:1, clip:[[], [0], [], []]}),
		main.entity('plat', {x:10400, y:224, w:30, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:10472, y:136, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10576, y:88, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10656, y:148, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10748, y:124, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('vine', {x:10856, y:0, h:124}),
	], [
		main.entity('plat', {x:10880, y:224, w:30, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:11104, y:88, w:5, h:1, dropoff: true, mode:2, clip:[[], [], [0], []]}),
		main.entity('plat', {x:11184, y:88, w:3, h:1, dropoff: true, mode:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:11232, y:88, w:4, h:1, dropoff: true, mode:2, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:11296, y:88, w:3, h:1, dropoff: true, mode:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:11344, y:88, w:1, h:1, dropoff: true, mode:2, clip:[[], [0], [0], []]}),
		main.entity('vine', {x:10944, y:0, h:76}),
		main.entity('vine', {x:11032, y:0, h:88}),
	], [
		main.entity('plat', {x:11472, y:176, w:4, h:4, dropoff: true, mode:2, clip:[[], [], [], []]}),
		main.entity('plat', {x:11744, y:192, w:2, h:3, dropoff: true, mode:2, clip:[[], [], [0, 1, 2], []]}),
		main.entity('plat', {x:11776, y:160, w:3, h:5, dropoff: true, mode:2, clip:[[], [2, 3, 4], [], []]}),
		main.entity('plat', {x:11360, y:88, w:4, h:1, dropoff: true, mode:2, clip:[[], [0], [], []]}),
		main.entity('plat', {x:11360, y:224, w:7, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:11472, y:224, w:23, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:11584, y:120, w:10, h:1, dropoff: true, mode:2, clip:[[], [], [], []]}),
	], [
		main.entity('plat', {x:12048, y:192, w:2, h:3, dropoff: true, mode:2, clip:[[], [], [0, 1, 2], []]}),
		main.entity('plat', {x:12080, y:160, w:2, h:5, dropoff: true, mode:2, clip:[[], [2, 3, 4], [], []]}),
		main.entity('plat', {x:11840, y:224, w:26, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:11840, y:92, w:10, h:1, dropoff: true, mode:2, clip:[[], [], [], []]}),
		main.entity('plat', {x:12256, y:192, w:2, h:3, mode:2, col:15, clip:[[], [2], [0, 1, 2], []]}),
		main.entity('plat', {x:12288, y:160, w:2, h:5, mode:2, col:15, clip:[[], [2, 3, 4], [0, 1, 2, 3, 4], []]}),
	], [
		main.entity('plat', {x:12688, y:192, w:2, h:3, dropoff: true, mode:2, clip:[[], [], [0, 1, 2], []]}),
		main.entity('plat', {x:12720, y:160, w:2, h:5, dropoff: true, mode:2, clip:[[], [2, 3, 4], [], []]}),
		main.entity('plat', {x:12320, y:128, w:2, h:7, mode:2, col:15, clip:[[], [2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6], []]}),
		main.entity('plat', {x:12352, y:96, w:2, h:9, mode:2, col:15, clip:[[], [2, 3, 4, 5, 6, 7, 8], [5, 8], []]}),
		main.entity('plat', {x:12384, y:176, w:2, h:1, dropoff: true, mode:2, clip:[[], [0], [], []]}),
		main.entity('plat', {x:12384, y:224, w:26, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('wire', {x:12436, y:124, h:16, bind:[
			main.entity('shooter', {x:1.2437E+4, y:5.0, bind:[], s:10, a:4.712388980385}),
		]}),
		main.entity('wire', {x:12700, y:68, h:16, bind:[
			main.entity('shooter', {x:1.2701E+4, y:5.0, bind:[], s:10, a:4.712388980385}),
		]}),
		main.entity('vine', {x:12436, y:0, h:156}),
		main.entity('vine', {x:12524, y:0, h:80}),
		main.entity('vine', {x:12612, y:0, h:104}),
		main.entity('vine', {x:12700, y:0, h:92}),
		main.entity('vine', {x:12788, y:0, h:124}),
	], [
		main.entity('plat', {x:13056, y:192, w:2, h:3, dropoff: true, mode:2, clip:[[], [], [0, 1, 2], []]}),
		main.entity('plat', {x:13088, y:160, w:2, h:5, dropoff: true, mode:2, clip:[[], [2, 3, 4], [0, 1, 2, 3, 4], []]}),
		main.entity('plat', {x:13120, y:128, w:2, h:7, dropoff: true, mode:2, clip:[[], [2, 3, 4, 5, 6], [], []]}),
		main.entity('plat', {x:12800, y:224, w:30, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('wire', {x:13052, y:100, h:16, bind:[
			main.entity('shooter', {x:1.3053E+4, y:5.0, bind:[], s:10, a:4.712388980385}),
		]}),
		main.entity('vine', {x:12876, y:0, h:76}),
		main.entity('vine', {x:12964, y:0, h:56}),
		main.entity('vine', {x:13052, y:0, h:124}),
		main.entity('vine', {x:13140, y:0, h:76}),
		main.entity('vine', {x:13228, y:0, h:112}),
	], [
		main.entity('plat', {x:13280, y:224, w:13, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:13488, y:176, w:2, h:4, mode:2, col:15, clip:[[], [3], [0, 1, 2, 3], []]}),
		main.entity('plat', {x:13520, y:144, w:15, h:6, mode:2, col:15, clip:[[], [2, 3, 4, 5], [0, 1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:13552, y:0, w:2, h:7, mode:2, col:15, clip:[[], [], [6, 0, 1], []]}),
		main.entity('plat', {x:13584, y:96, w:9, h:1, mode:2, col:15, clip:[[], [0], [], []]}),
		main.entity('plat', {x:13584, y:0, w:11, h:2, mode:2, col:15, clip:[[], [0, 1], [0, 1], []]}),
		main.entity('wire', {x:13404, y:92, h:16, bind:[
			main.entity('shooter', {x:1.3405E+4, y:5.0, bind:[], s:10, a:4.712388980385}),
		]}),
		main.entity('vine', {x:13316, y:0, h:56}),
		main.entity('vine', {x:13404, y:0, h:124}),
	], [
		main.entity('plat', {x:13760, y:0, w:1, h:2, mode:2, col:15, clip:[[], [0, 1], [0, 1], []]}),
		main.entity('plat', {x:13760, y:144, w:16, h:6, mode:2, col:15, clip:[[], [0, 1, 2, 3, 4, 5], [2, 3, 4, 5], []]}),
		main.entity('plat', {x:13776, y:0, w:2, h:7, mode:2, col:15, clip:[[], [0, 1], [0, 1], []]}),
		main.entity('plat', {x:13808, y:0, w:15, h:2, mode:2, col:15, clip:[[], [0, 1], [0], []]}),
		main.entity('plat', {x:13856, y:96, w:10, h:1, mode:2, col:15, clip:[[], [], [], []]}),
		main.entity('plat', {x:14016, y:176, w:14, h:4, mode:2, col:15, clip:[[], [0, 1, 2, 3], [0, 1, 2, 3], []]}),
		main.entity('plat', {x:14048, y:0, w:11, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:14064, y:80, w:1, h:4, mode:2, col:15, clip:[[], [], [0, 3], []]}),
		main.entity('plat', {x:14080, y:80, w:4, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:14080, y:128, w:7, h:1, mode:2, col:15, clip:[[], [0], [], []]}),
		main.entity('plat', {x:14144, y:64, w:5, h:2, mode:2, col:15, clip:[[], [1], [0, 1], []]}),
		main.entity('plat', {x:14224, y:0, w:1, h:9, mode:2, col:15, clip:[[], [0, 4, 5], [0, 1, 2, 3, 4, 5, 6, 7, 8], []]}),
		main.entity('pressure_plate', {x:14016, y:174, w:32, bind:[
			main.entity('shooter', {x:1.4025E+4, y:37.0, bind:[], s:10, a:4.712388980385}),
			main.entity('shooter', {x:1.4037E+4, y:37.0, bind:[], s:10, a:4.712388980385}),
		]}),
	], [
		main.entity('plat', {x:14240, y:0, w:1, h:9, mode:2, col:15, clip:[[], [0, 1, 2, 3, 4, 5, 6, 7, 8], [], []]}),
		main.entity('plat', {x:14240, y:176, w:4, h:4, mode:2, col:15, clip:[[], [0, 1, 2, 3], [3], []]}),
		main.entity('plat', {x:14304, y:224, w:26, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:14312, y:120, w:4, h:1, dropoff: true, mode:2, clip:[[], [], [], []]}),
		main.entity('vine', {x:14400, y:0, h:184}),
		main.entity('vine', {x:14480, y:0, h:144}),
		main.entity('vine', {x:14560, y:0, h:184}),
		main.entity('vine', {x:14640, y:0, h:144}),
	], [
		main.entity('plat', {x:14720, y:224, w:30, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('vine', {x:14720, y:0, h:184}),
		main.entity('vine', {x:14800, y:0, h:144}),
		main.entity('vine', {x:14880, y:0, h:184}),
		main.entity('vine', {x:14960, y:0, h:144}),
		main.entity('vine', {x:15040, y:0, h:184}),
		main.entity('vine', {x:15120, y:0, h:144}),
	], [
		main.entity('plat', {x:15200, y:224, w:30, h:1, mode:2, col:15, clip:[[], [0], [0], []]}),
		main.entity('vine', {x:15200, y:0, h:184}),
		main.entity('vine', {x:15280, y:0, h:144}),
	], [
		main.entity('plat', {x:15680, y:0, w:2, h:10, mode:2, col:15, clip:[[], [], [], []]}),
		main.entity('plat', {x:15680, y:224, w:20, h:1, mode:2, col:15, clip:[[], [0], [], []]}),
		main.entity('plat', {x:15968, y:0, w:2, h:11, mode:2, col:15, clip:[[], [], [], []]}),
	], [
		main.entity('text', {x:16160, title:'Level 3'}),
		main.entity('plat', {x:16160, y:0, w:1, h:11, mode:1, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:16160, y:224, w:14, h:1, mode:1, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:16176, y:0, w:29, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:16384, y:176, w:2, h:4, mode:1, col:15, clip:[[], [3], [3], []]}),
		main.entity('plat', {x:16416, y:224, w:14, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:16480, y:152, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
	], [
		main.entity('plat', {x:16640, y:0, w:28, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:16640, y:224, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:16672, y:120, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:16864, y:104, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:17088, y:0, w:2, h:11, mode:1, col:15, clip:[[], [0], [0], []]}),
	], [
		main.entity('plat', {x:17120, y:0, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17120, y:224, w:4, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17184, y:224, w:26, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17192, y:176, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:17360, y:128, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:17536, y:80, w:4, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
	], [
		main.entity('plat', {x:17600, y:64, w:2, h:2, dropoff: true, mode:1, col:9, clip:[[], [1], [0, 1], []]}),
		main.entity('plat', {x:17600, y:0, w:19, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17600, y:224, w:19, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17632, y:48, w:2, h:3, dropoff: true, mode:1, col:9, clip:[[], [1, 2], [], []]}),
		main.entity('plat', {x:17712, y:144, w:12, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:17904, y:0, w:2, h:5, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17904, y:112, w:2, h:8, mode:1, col:15, clip:[[], [7, 2], [2, 3, 4, 5, 6, 7], []]}),
		main.entity('plat', {x:17936, y:0, w:9, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17936, y:144, w:2, h:6, mode:1, col:15, clip:[[], [0, 1, 2, 3, 4, 5], [2, 3, 4, 5], []]}),
		main.entity('plat', {x:17968, y:176, w:2, h:4, mode:1, col:15, clip:[[], [0, 1, 2, 3], [3], []]}),
		main.entity('plat', {x:18000, y:224, w:2, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18032, y:160, w:1, h:5, mode:1, col:15, clip:[[], [4], [2, 4], []]}),
		main.entity('plat', {x:18048, y:192, w:1, h:1, dropoff: true, mode:1, clip:[[], [0], [], []]}),
		main.entity('plat', {x:18048, y:224, w:2, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('pressure_plate', {x:18048, y:222, w:32, bind:[
			main.entity('shooter', {x:1.8055E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8071E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
	], [
		main.entity('plat', {x:18224, y:128, w:2, h:2, mode:1, col:9, clip:[[], [], [0, 1], []]}),
		main.entity('plat', {x:18224, y:160, w:2, h:5, mode:1, clip:[[], [], [0, 1, 2, 3, 4], []]}),
		main.entity('plat', {x:18256, y:96, w:2, h:2, mode:1, col:9, clip:[[], [], [0, 1], []]}),
		main.entity('plat', {x:18256, y:128, w:2, h:7, mode:1, clip:[[], [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6], []]}),
		main.entity('plat', {x:18288, y:64, w:2, h:2, mode:1, col:11, clip:[[], [], [], []]}),
		main.entity('plat', {x:18288, y:96, w:2, h:9, mode:1, col:2, clip:[[], [0, 1, 2, 3, 4, 5, 6, 7, 8], [], []]}),
		main.entity('plat', {x:18080, y:0, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18080, y:224, w:20, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18128, y:128, w:1, h:4, mode:1, col:15, clip:[[], [], [2], []]}),
		main.entity('plat', {x:18144, y:160, w:5, h:1, mode:1, col:15, clip:[[], [0], [], []]}),
		main.entity('plat', {x:18256, y:176, w:3, h:1, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:18384, y:176, w:1, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:18400, y:144, w:1, h:6, mode:1, col:15, clip:[[], [5, 2], [5], []]}),
		main.entity('plat', {x:18416, y:224, w:5, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18480, y:176, w:1, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:18496, y:144, w:2, h:6, mode:1, col:15, clip:[[], [5, 2], [0, 1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:18528, y:112, w:2, h:8, mode:1, col:15, clip:[[], [2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], []]}),
		main.entity('pressure_plate', {x:18080, y:222, w:32, bind:[
			main.entity('shooter', {x:1.8087E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8103E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8119E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:18144, y:158, w:80, bind:[
			main.entity('shooter', {x:1.8151E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8167E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8183E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8199E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8215E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:18320, y:222, w:80, bind:[
			main.entity('shooter', {x:1.8327E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8343E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8359E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8375E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8391E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:18416, y:222, w:80, bind:[
			main.entity('shooter', {x:1.8423E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8439E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8455E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8471E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8487E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
	], [
		main.entity('plat', {x:18560, y:0, w:5, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18560, y:80, w:2, h:10, mode:1, col:15, clip:[[], [2, 3, 4, 5, 6, 7, 8, 9], [9], []]}),
		main.entity('plat', {x:18592, y:224, w:28, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18624, y:80, w:2, h:7, mode:1, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:18640, y:0, w:2, h:3, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18656, y:80, w:15, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18672, y:0, w:23, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18704, y:176, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:18864, y:144, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:18896, y:48, w:4, h:3, mode:1, col:15, clip:[[], [2], [2], []]}),
		main.entity('plat', {x:18960, y:80, w:5, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19024, y:176, w:1, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('pressure_plate', {x:18752, y:174, w:48, bind:[
			main.entity('shooter', {x:1.8759E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8775E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8791E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:18768, y:78, w:48, bind:[
			main.entity('shooter', {x:1.8775E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8791E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8807E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
	], [
		main.entity('plat', {x:19040, y:0, w:25, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19040, y:80, w:9, h:1, mode:1, col:15, clip:[[], [0], [], []]}),
		main.entity('plat', {x:19040, y:176, w:6, h:1, dropoff: true, mode:1, clip:[[], [0], [], []]}),
		main.entity('plat', {x:19040, y:224, w:20, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19168, y:144, w:4, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:19216, y:112, w:1, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:19232, y:64, w:2, h:8, mode:1, col:15, clip:[[], [5, 3], [0, 1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:19264, y:64, w:6, h:6, mode:1, col:15, clip:[[], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:19360, y:64, w:2, h:11, mode:1, col:15, clip:[[], [10, 0, 1, 2, 3, 4, 5], [10], []]}),
		main.entity('plat', {x:19392, y:224, w:8, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19440, y:0, w:2, h:11, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19472, y:0, w:3, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('pressure_plate', {x:19040, y:78, w:48, bind:[
			main.entity('shooter', {x:1.9047E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9063E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9079E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:19056, y:174, w:48, bind:[
			main.entity('shooter', {x:1.9063E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9079E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9095E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:19392, y:222, w:32, bind:[
			main.entity('shooter', {x:1.9399E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9411E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9423E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:19480, y:222, w:32, bind:[
			main.entity('shooter', {x:1.9487E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9499E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9511E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
	], [
		main.entity('plat', {x:19520, y:0, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19520, y:224, w:1, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19536, y:224, w:29, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19576, y:184, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:19664, y:148, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:19752, y:120, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:19840, y:92, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:19928, y:68, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('pressure_plate', {x:19856, y:90, w:16, bind:[
			main.entity('shooter', {x:1.9863E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
	], [
		main.entity('plat', {x:20000, y:0, w:16, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20000, y:224, w:11, h:1, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20016, y:96, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:20096, y:64, w:10, h:1, mode:1, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:20104, y:140, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:20176, y:176, w:9, h:4, mode:1, col:15, clip:[[], [3], [1, 2, 3], []]}),
		main.entity('plat', {x:20256, y:0, w:2, h:8, mode:1, col:15, clip:[[], [0, 4], [0], []]}),
		main.entity('plat', {x:20288, y:0, w:12, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20320, y:192, w:2, h:3, mode:1, col:15, clip:[[], [0, 1, 2], [1, 2], []]}),
		main.entity('plat', {x:20352, y:208, w:2, h:2, mode:1, col:15, clip:[[], [0, 1], [1], []]}),
		main.entity('plat', {x:20384, y:224, w:6, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('pressure_plate', {x:20176, y:174, w:32, bind:[
			main.entity('shooter', {x:2.0183E+4, y:85.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:2.0195E+4, y:85.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:2.0207E+4, y:85.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('vine', {x:20424, y:16, h:168}),
	], [
		main.entity('plat', {x:20640, y:208, w:1, h:2, dropoff: true, mode:1, clip:[[], [], [0, 1], []]}),
		main.entity('plat', {x:20656, y:192, w:1, h:3, dropoff: true, mode:1, clip:[[], [1, 2], [0, 1, 2], []]}),
		main.entity('plat', {x:20672, y:176, w:1, h:4, dropoff: true, mode:1, clip:[[], [1, 2, 3], [0, 1, 2, 3], []]}),
		main.entity('plat', {x:20688, y:160, w:1, h:5, dropoff: true, mode:1, clip:[[], [1, 2, 3, 4], [0, 1, 2, 3, 4], []]}),
		main.entity('plat', {x:20704, y:144, w:3, h:6, dropoff: true, mode:1, clip:[[], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:20752, y:160, w:1, h:5, dropoff: true, mode:1, clip:[[], [0, 1, 2, 3, 4], [1, 2, 3, 4], []]}),
		main.entity('plat', {x:20768, y:176, w:1, h:4, dropoff: true, mode:1, clip:[[], [0, 1, 2, 3], [1, 2, 3], []]}),
		main.entity('plat', {x:20784, y:192, w:1, h:3, dropoff: true, mode:1, clip:[[], [0, 1, 2], [1, 2], []]}),
		main.entity('plat', {x:20800, y:208, w:1, h:2, dropoff: true, mode:1, clip:[[], [0, 1], [], []]}),
		main.entity('plat', {x:20480, y:0, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20480, y:224, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20672, y:72, w:6, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('vine', {x:20504, y:16, h:131}),
		main.entity('vine', {x:20584, y:16, h:168}),
		main.entity('vine', {x:20856, y:16, h:131}),
		main.entity('vine', {x:20936, y:16, h:113}),
	], [
		main.entity('plat', {x:20960, y:0, w:7, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20960, y:224, w:7, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:21008, y:112, w:4, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:21072, y:0, w:13, h:15, mode:1, col:15, clip:[[], [0, 14, 7], [], []]}),
	]
];
export {level}