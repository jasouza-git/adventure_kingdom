let level = main => [
	[
		main.entity('text', {x:0, title:'Level 1'}),
		main.entity('plat', {x:240, y:128, w:15, h:7, dropoff: true, mode:0, clip:[[], [], [0, 1, 2, 3, 4, 5, 6], []]}),
		main.entity('plat', {x:0, y:224, w:22, h:1, mode:0, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:352, y:176, w:8, h:4, mode:0, col:15, clip:[[], [3], [0, 1, 2, 3], []]}),
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
		main.entity('plat', {x:1488, y:224, w:27, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:1536, y:64, w:13, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:1792, y:120, w:8, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
	], [
		main.entity('plat', {x:1920, y:224, w:23, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:1920, y:120, w:5, h:1, dropoff: true, mode:0, clip:[[], [0], [], []]}),
		main.entity('plat', {x:2056, y:88, w:13, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:2288, y:208, w:7, h:2, mode:0, col:15, clip:[[], [1], [0, 1], []]}),
	], [
		main.entity('plat', {x:2400, y:208, w:8, h:2, mode:0, col:15, clip:[[], [0, 1], [0, 1], []]}),
		main.entity('plat', {x:2528, y:176, w:2, h:4, mode:0, col:15, clip:[[], [2, 3], [3], []]}),
		main.entity('plat', {x:2560, y:224, w:17, h:1, mode:0, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:2764, y:40, w:2, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:2832, y:224, w:3, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:2840, y:168, w:1, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
	], [
		main.entity('plat', {x:2880, y:224, w:30, h:1, clip:[[], [0], [0], []], mode:3}),
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
		main.entity('plat', {x:3360, y:224, w:2, h:1, clip:[[], [0], [0], []], mode:3}),
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
		main.entity('plat', {x:4000, y:224, w:20, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:4016, y:72, w:3, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:4080, y:48, w:7, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:4160, y:192, w:10, h:2, mode:0, col:15, clip:[[], [], [0, 1], []]}),
		main.entity('plat', {x:4192, y:144, w:8, h:2, dropoff: true, mode:0, clip:[[], [], [0, 1], []]}),
	], [
		main.entity('plat', {x:4320, y:112, w:2, h:8, dropoff: true, mode:0, clip:[[], [0, 1, 2, 3, 4, 5, 6, 7], [], []]}),
		main.entity('plat', {x:4320, y:224, w:7, h:1, clip:[[], [0], [0], []], mode:3}),
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
		main.entity('plat', {x:4752, y:224, w:3, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:4768, y:96, w:2, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
	], [
		main.entity('plat', {x:4800, y:224, w:30, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:4800, y:96, w:8, h:1, dropoff: true, mode:0, clip:[[], [0], [], []]}),
		main.entity('plat', {x:4984, y:136, w:10, h:1, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:5200, y:104, w:5, h:1, dropoff: true, mode:0, clip:[[], [], [0], []]}),
		main.entity('pressure_plate', {x:5096, y:134, w:32, bind:[
			main.entity('shooter', {x:5195.0, y:109.0, bind:[], s:17, a:3.14159265359}),
		]}),
	], [
		main.entity('plat', {x:5632, y:176, w:4, h:4, dropoff: true, mode:0, clip:[[], [], [], []]}),
		main.entity('plat', {x:5280, y:224, w:6, h:1, clip:[[], [0], [0], []], mode:3}),
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
		main.entity('plat', {x:6384, y:96, w:12, h:9, dropoff: true, mode:0, clip:[[], [], [], []]}),
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
		main.entity('plat', {x:7680, y:0, w:2, h:10, dropoff: true, mode:0, col:15, clip:[[], [], [], []]}),
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
		main.entity('plat', {x:8800, y:224, w:10, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('vine', {x:8844, y:0, h:132}),
		main.entity('vine', {x:8927, y:0, h:92}),
	], [
		main.entity('plat', {x:8960, y:224, w:22, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:9280, y:176, w:2, h:1, dropoff: true, mode:2, clip:[[], [], [0], []]}),
		main.entity('plat', {x:9312, y:128, w:8, h:7, mode:2, col:15, clip:[[], [6, 3], [3, 6], []]}),
		main.entity('vine', {x:9010, y:0, h:148}),
		main.entity('vine', {x:9093, y:0, h:60}),
		main.entity('vine', {x:9176, y:0, h:112}),
		main.entity('vine', {x:9260, y:0, h:92}),
	], [
		main.entity('plat', {x:9440, y:176, w:2, h:1, dropoff: true, mode:2, clip:[[], [0], [], []]}),
		main.entity('plat', {x:9440, y:224, w:30, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('vine', {x:9484, y:0, h:156}),
		main.entity('vine', {x:9572, y:0, h:80}),
		main.entity('vine', {x:9660, y:0, h:104}),
		main.entity('vine', {x:9748, y:0, h:28}),
		main.entity('vine', {x:9836, y:0, h:124}),
	], [
		main.entity('plat', {x:9920, y:224, w:3, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:9936, y:176, w:2, h:1, dropoff: true, mode:2, clip:[[], [], [0], []]}),
		main.entity('plat', {x:9968, y:128, w:4, h:7, mode:2, col:15, clip:[[], [6, 3], [2, 3, 4, 5, 6], []]}),
		main.entity('plat', {x:10032, y:160, w:2, h:5, mode:2, col:15, clip:[[], [0, 1, 2, 3, 4], [2, 3, 4], []]}),
		main.entity('plat', {x:10064, y:192, w:2, h:3, mode:2, col:15, clip:[[], [0, 1, 2], [1, 2], []]}),
		main.entity('plat', {x:10096, y:208, w:2, h:2, mode:2, col:15, clip:[[], [0, 1], [1], []]}),
		main.entity('plat', {x:10128, y:224, w:17, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:10176, y:152, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10272, y:128, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10368, y:112, w:2, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('vine', {x:9924, y:0, h:76}),
	], [
		main.entity('plat', {x:10400, y:112, w:1, h:1, dropoff: true, mode:1, clip:[[], [0], [], []]}),
		main.entity('plat', {x:10400, y:224, w:30, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:10472, y:136, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10576, y:88, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10656, y:148, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:10748, y:124, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('vine', {x:10856, y:0, h:124}),
	], [
		main.entity('plat', {x:10880, y:224, w:30, h:1, clip:[[], [0], [0], []], mode:3}),
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
		main.entity('plat', {x:11360, y:224, w:7, h:1, clip:[[], [0], [0], []], mode:3}),
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
	], [
		main.entity('text', {x:16000, title:'Level 3'}),
		main.entity('plat', {x:16000, y:0, w:1, h:11, mode:1, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:16000, y:224, w:14, h:1, mode:1, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:16016, y:0, w:29, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:16224, y:176, w:2, h:4, mode:1, col:15, clip:[[], [3], [3], []]}),
		main.entity('plat', {x:16256, y:224, w:14, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:16320, y:152, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
	], [
		main.entity('plat', {x:16480, y:0, w:28, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:16480, y:224, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:16512, y:120, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:16704, y:104, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:16928, y:0, w:2, h:11, mode:1, col:15, clip:[[], [0], [0], []]}),
	], [
		main.entity('plat', {x:16960, y:0, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:16960, y:224, w:4, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17024, y:224, w:26, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:17032, y:176, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:17200, y:128, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:17376, y:80, w:4, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('mananangal', {x:1.724E+4, y:32, p:[16984, 32, 17496 ,32], ess:200}),
		main.entity('mananangal', {x:1.748E+4, y:32, p:[17224, 32, 17736 ,32], ess:200}),
	], [
		main.entity('plat', {x:17440, y:64, w:2, h:2, dropoff: true, mode:1, col:9, clip:[[], [1], [0, 1], []]}),
		main.entity('plat', {x:17440, y:0, w:19, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17440, y:224, w:19, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:17472, y:48, w:2, h:3, dropoff: true, mode:1, col:9, clip:[[], [1, 2], [], []]}),
		main.entity('plat', {x:17552, y:144, w:12, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:17744, y:0, w:2, h:5, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17744, y:112, w:2, h:8, mode:1, col:15, clip:[[], [7, 2], [2, 3, 4, 5, 6, 7], []]}),
		main.entity('plat', {x:17776, y:0, w:9, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17776, y:144, w:2, h:6, mode:1, col:15, clip:[[], [0, 1, 2, 3, 4, 5], [2, 3, 4, 5], []]}),
		main.entity('plat', {x:17808, y:176, w:2, h:4, mode:1, col:15, clip:[[], [0, 1, 2, 3], [3], []]}),
		main.entity('plat', {x:17840, y:224, w:2, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17872, y:160, w:1, h:5, mode:1, col:15, clip:[[], [4], [2, 4], []]}),
		main.entity('plat', {x:17888, y:192, w:1, h:1, dropoff: true, mode:1, clip:[[], [0], [], []]}),
		main.entity('plat', {x:17888, y:224, w:2, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('pressure_plate', {x:17888, y:222, w:32, bind:[
			main.entity('shooter', {x:1.7895E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.7911E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('mananangal', {x:1.8048E+4, y:32, p:[17792, 32, 18304 ,32], ess:200}),
	], [
		main.entity('plat', {x:18064, y:128, w:2, h:2, mode:1, col:9, clip:[[], [], [0, 1], []]}),
		main.entity('plat', {x:18064, y:160, w:2, h:5, mode:1, clip:[[], [], [0, 1, 2, 3, 4], []]}),
		main.entity('plat', {x:18096, y:96, w:2, h:2, mode:1, col:9, clip:[[], [], [0, 1], []]}),
		main.entity('plat', {x:18096, y:128, w:2, h:7, mode:1, clip:[[], [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6], []]}),
		main.entity('plat', {x:18128, y:64, w:2, h:2, mode:1, col:11, clip:[[], [], [], []]}),
		main.entity('plat', {x:18128, y:96, w:2, h:9, mode:1, col:2, clip:[[], [0, 1, 2, 3, 4, 5, 6, 7, 8], [], []]}),
		main.entity('plat', {x:17920, y:0, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17920, y:224, w:20, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:17968, y:128, w:1, h:4, mode:1, col:15, clip:[[], [], [2], []]}),
		main.entity('plat', {x:17984, y:160, w:5, h:1, mode:1, col:15, clip:[[], [0], [], []]}),
		main.entity('plat', {x:18096, y:176, w:3, h:1, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:18224, y:176, w:1, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:18240, y:144, w:1, h:6, mode:1, col:15, clip:[[], [5, 2], [5], []]}),
		main.entity('plat', {x:18256, y:224, w:5, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18320, y:176, w:1, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:18336, y:144, w:2, h:6, mode:1, col:15, clip:[[], [5, 2], [0, 1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:18368, y:112, w:2, h:8, mode:1, col:15, clip:[[], [2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], []]}),
		main.entity('pressure_plate', {x:17920, y:222, w:32, bind:[
			main.entity('shooter', {x:1.7927E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.7943E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.7959E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:17984, y:158, w:80, bind:[
			main.entity('shooter', {x:1.7991E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8007E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8023E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8039E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8055E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:18160, y:222, w:80, bind:[
			main.entity('shooter', {x:1.8167E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8183E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8199E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8215E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8231E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:18256, y:222, w:80, bind:[
			main.entity('shooter', {x:1.8263E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8279E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8295E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8311E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8327E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('mananangal', {x:1.8208E+4, y:48, p:[17952, 48, 18464 ,48], ess:200}),
	], [
		main.entity('plat', {x:18400, y:0, w:5, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18400, y:80, w:2, h:10, mode:1, col:15, clip:[[], [2, 3, 4, 5, 6, 7, 8, 9], [9], []]}),
		main.entity('plat', {x:18432, y:224, w:28, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18464, y:80, w:2, h:7, mode:1, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:18480, y:0, w:2, h:3, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18496, y:80, w:15, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18512, y:0, w:23, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18544, y:176, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:18704, y:144, w:8, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:18736, y:48, w:4, h:3, mode:1, col:15, clip:[[], [2], [2], []]}),
		main.entity('plat', {x:18800, y:80, w:5, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18864, y:176, w:1, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('pressure_plate', {x:18592, y:174, w:48, bind:[
			main.entity('shooter', {x:1.8599E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8615E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8631E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:18608, y:78, w:48, bind:[
			main.entity('shooter', {x:1.8615E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8631E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8647E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('mananangal', {x:1.876E+4, y:32, p:[18536, 32, 18984 ,32], ess:200}),
		main.entity('mananangal', {x:1.896E+4, y:32, p:[18736, 32, 19184 ,32], ess:200}),
	], [
		main.entity('plat', {x:18880, y:0, w:25, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:18880, y:80, w:9, h:1, mode:1, col:15, clip:[[], [0], [], []]}),
		main.entity('plat', {x:18880, y:176, w:6, h:1, dropoff: true, mode:1, clip:[[], [0], [], []]}),
		main.entity('plat', {x:18880, y:224, w:20, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19008, y:144, w:4, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:19056, y:112, w:1, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:19072, y:64, w:2, h:8, mode:1, col:15, clip:[[], [5, 3], [0, 1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:19104, y:64, w:6, h:6, mode:1, col:15, clip:[[], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:19200, y:64, w:2, h:11, mode:1, col:15, clip:[[], [10, 0, 1, 2, 3, 4, 5], [10], []]}),
		main.entity('plat', {x:19232, y:224, w:8, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19280, y:0, w:2, h:11, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19312, y:0, w:3, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('pressure_plate', {x:18880, y:78, w:48, bind:[
			main.entity('shooter', {x:1.8887E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8903E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8919E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:18896, y:174, w:48, bind:[
			main.entity('shooter', {x:1.8903E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8919E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.8935E+4, y:101.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:19232, y:222, w:32, bind:[
			main.entity('shooter', {x:1.9239E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9251E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9263E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('pressure_plate', {x:19320, y:222, w:32, bind:[
			main.entity('shooter', {x:1.9327E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9339E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:1.9351E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('mananangal', {x:1.9656E+4, y:40, p:[19344, 40, 19968 ,40], ess:200}),
	], [
		main.entity('plat', {x:19360, y:0, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19360, y:224, w:1, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19376, y:224, w:29, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:19416, y:184, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:19504, y:148, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:19592, y:120, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:19680, y:92, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:19768, y:68, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('pressure_plate', {x:19696, y:90, w:16, bind:[
			main.entity('shooter', {x:1.9703E+4, y:21.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('mananangal', {x:1.9768E+4, y:40, p:[19568, 40, 19968 ,40], ess:200}),
	], [
		main.entity('plat', {x:19840, y:0, w:16, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:19840, y:224, w:11, h:1, clip:[[], [0], [0], []], mode:3}),
		main.entity('plat', {x:19856, y:96, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:19936, y:64, w:10, h:1, mode:1, col:15, clip:[[], [], [0], []]}),
		main.entity('plat', {x:19944, y:140, w:3, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('plat', {x:20016, y:176, w:9, h:4, mode:1, col:15, clip:[[], [3], [1, 2, 3], []]}),
		main.entity('plat', {x:20096, y:0, w:2, h:8, mode:1, col:15, clip:[[], [0, 4], [0], []]}),
		main.entity('plat', {x:20128, y:0, w:12, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20160, y:192, w:2, h:3, mode:1, col:15, clip:[[], [0, 1, 2], [1, 2], []]}),
		main.entity('plat', {x:20192, y:208, w:2, h:2, mode:1, col:15, clip:[[], [0, 1], [1], []]}),
		main.entity('plat', {x:20224, y:224, w:6, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('pressure_plate', {x:20016, y:174, w:32, bind:[
			main.entity('shooter', {x:2.0023E+4, y:85.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:2.0035E+4, y:85.0, bind:[], s:0, a:4.712388980385}),
			main.entity('shooter', {x:2.0047E+4, y:85.0, bind:[], s:0, a:4.712388980385}),
		]}),
		main.entity('vine', {x:20264, y:16, h:168}),
	], [
		main.entity('plat', {x:20480, y:208, w:1, h:2, dropoff: true, mode:1, clip:[[], [], [0, 1], []]}),
		main.entity('plat', {x:20496, y:192, w:1, h:3, dropoff: true, mode:1, clip:[[], [1, 2], [0, 1, 2], []]}),
		main.entity('plat', {x:20512, y:176, w:1, h:4, dropoff: true, mode:1, clip:[[], [1, 2, 3], [0, 1, 2, 3], []]}),
		main.entity('plat', {x:20528, y:160, w:1, h:5, dropoff: true, mode:1, clip:[[], [1, 2, 3, 4], [0, 1, 2, 3, 4], []]}),
		main.entity('plat', {x:20544, y:144, w:3, h:6, dropoff: true, mode:1, clip:[[], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], []]}),
		main.entity('plat', {x:20592, y:160, w:1, h:5, dropoff: true, mode:1, clip:[[], [0, 1, 2, 3, 4], [1, 2, 3, 4], []]}),
		main.entity('plat', {x:20608, y:176, w:1, h:4, dropoff: true, mode:1, clip:[[], [0, 1, 2, 3], [1, 2, 3], []]}),
		main.entity('plat', {x:20624, y:192, w:1, h:3, dropoff: true, mode:1, clip:[[], [0, 1, 2], [1, 2], []]}),
		main.entity('plat', {x:20640, y:208, w:1, h:2, dropoff: true, mode:1, clip:[[], [0, 1], [], []]}),
		main.entity('plat', {x:20320, y:0, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20320, y:224, w:30, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20512, y:72, w:6, h:1, dropoff: true, mode:1, clip:[[], [], [], []]}),
		main.entity('vine', {x:20344, y:16, h:131}),
		main.entity('vine', {x:20424, y:16, h:168}),
		main.entity('vine', {x:20696, y:16, h:131}),
		main.entity('vine', {x:20776, y:16, h:113}),
	], [
		main.entity('plat', {x:20800, y:0, w:7, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20800, y:224, w:7, h:1, mode:1, col:15, clip:[[], [0], [0], []]}),
		main.entity('plat', {x:20848, y:112, w:4, h:1, dropoff: true, mode:1, clip:[[], [], [0], []]}),
		main.entity('plat', {x:20912, y:0, w:13, h:15, mode:1, col:15, clip:[[], [0, 14, 7], [], []]}),
	]
];
export {level}

import { entities_type } from "../types";
import { algo } from "../algorithms";

let required_files:string[] = [
    // Menu
    'Rise_of_the_Aswang_King.png',
    // Background
    'Housesv2.png', 'bg normal (no clouds) .png', 'bg normal (w clouds) .png',
    // Platforms
    'Flowers.png', 'Bgitems.png', 'Blocks.png', 'Treesv2.png', 'Lagablab, bubble and random vegetation.png', 'Lava.png'
    // Entities
    'Dog.png', 'Cat (1).png', 'Aswang King.png', 'Arrow.png', 'Mananangalv3.png', 'Shooterv2.png',
    // Objects
    'Vine.png', 'Tripwire2Correct.png', 'pressure.png',
    // Player
    'Mcparts.png',
    // Music
    'song/1st Temp BG Song (New Area).mp3',
    // Fonts
    'arcade.ttf'
];
let entities:entities_type = {
    // Pinoy Entitiy
    pinoy: {
        default: {
            x:160, y:0, m:[0,0], hitbox:[], nocollide:[],
            crouch: false, // Is character crouching?
            jumping: false,// Is character jumping?
            fright: true,  // Is character facing right?
            camera: 0,     // Camera on player offset, if undefined then no set
            swing: false,  // Is character swinging sword?
            interact:true, // Physics entities interacts
            swinging: 0,   // Current swining position (0->1)
            dead: -1,      // Level of deadness (-1 Not dead, 0->1 Dying)
            ground: -1,    // Collider character is on
            lives: 3
        },
        update: (d, o, t, dt) => {
            let c = n => [n%6, Math.floor(n/6)];
            let leg = [0,0], body = [0,0];
            if (d.dead == -1) {
                // Hitbox
                d.hitbox = [ 15,
                    d.x+12, d.y,
                    8, 29
                ];

                // Movement
                d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
                let cols = algo.physics(dt, d, o);
                if (d.crouch && !d.jumping) cols.forEach(c => {
                    if (c[1]==2 && o.interacts[c[0]].dropoff) d.nocollide.push(c[0]);
                });
                else d.nocollide = [];
                if (d.y >= o.h-32) d.dead = 0;
                
                // Camera
                if (d.camera != undefined) {
                    //o.camera[0] = d.x-o.w/2;
                    o.camera[0] += (d.x+d.camera-o.w/2-o.camera[0])*dt/100;
                }

                // Sword
                if (d.swing && d.dead == -1) {
                    d.swinging += (1-d.swinging)*dt/100;
                    if (d.swinging > 0.9) d.swing = false;
                } else d.swinging -= d.swinging*dt/100;
                let s = Math.round(d.swinging*2.4);
                if (s > 0) d.hitbox.push(0,
                    d.x+(d.fright?20:-4), d.y,
                    16, 29
                );


                leg = c(
                    d.ground == -1 ? 8 :
                    d.crouch ? 7 :
                    Math.abs(d.m[0]) > 0.5 ? 1+Math.floor(t/50)%6 :
                    0
                );
                body = c(
                    s > 0 ? 27+s :
                    d.ground == -1 ? 26 :
                    d.crouch ? 25 :
                    Math.abs(d.m[0]) > 0.5 ? 13+Math.floor(t/50)%12 :
                    12
                );
            } 
            if (d.dead != -1) {
                d.hitbox = [ 15,
                    d.x+12, o.h,
                    8, 29
                ];
                //d.y = o.h-33;
                leg = c(9);
                body = c(27);
                d.dead += (1-d.dead)*dt/300;
                if (d.dead > 0.99) {
                    d.dead = -1;
                    d.x = 0;
                    d.y = 195;
                    d.m = [0,0];
                    d.fright = true;
                }
            }

            // Rendering
            o.sprites('Mcparts.png', [d.x, d.dead == -1 ? d.y : d.dead < 0.5 ? d.y-10*Math.sin(d.dead*Math.PI) : o.h+22-Math.sin(d.dead*Math.PI)*(o.h-d.y+32)],
                // Leg
                [0, 0, 32*leg[0], 32*leg[1], 32, 32, 1-d.fright],
                // Body
                [0, d.crouch ? 2 : 0, 32*body[0] , 32*body[1], 32, 32, 1-d.fright]
            );

        }
    },
    // Background Entity
    background: {
        default: {
            darkmode: false,
            dark: 0,
            house: false,
            data: 0,
        },
        update: (d, o, t, dt) => {
            if (d.darkmode) d.dark += (1-d.dark)*dt/1000;
            else d.dark -= d.dark*dt/1000;
            o.draw('', {color:'skyblue'});
            //o.draw('', {img:'normal bg.png'});
            //o.draw('', {img:'dark bg.png', alpha: d.dark});
            for (var x = -5; x < 7; x++) o.sprites(d.data>>(x+5)&1 ? 'bg normal (no clouds) .png' : 'bg normal (w clouds) .png', [], [64*x, 0, 0, 0, 64, 240, 0, 0, 0, 0, 0, 0.1]);
            if (d.house) o.sprites('Housesv2.png', [], [0, 100, 126, 0, 128, 128]);
        },
        create: (o, arg) => {
            let d = 0;
            for (var x = 0; x < 10; x++) {
                if (Math.random() < 0.5) d += 1<<x;
            }
            return {
                data: d,
                ...arg
            }
        }
    },
    pet: {
        default: {x:0, y:0, m:[0,0], animal:0, jumping: false, ground:-1, nocollide:['pinoy'], hitbox:[]},
        update: (d, o, t, dt) => {
            // Hitbox
            d.hitbox = [ 15,
                d.x, d.y,
                26, 15
            ];
            // Follow AI
            if (d.follow != undefined && d.follow.dead == -1) {
                d.m[0] = Math.abs(d.follow.x+(d.follow.x>d.x?-15:15)-d.x)<15?0:d.follow.x>d.x?7:-7;//(d.follow.x+(d.follow.x>d.x?-10:10)-d.x)/10;
                if (Math.abs(d.follow.y-d.y) > o.h) {
                    d.x = d.follow.x;
                    d.y = d.follow.y;
                }
                // Jump
                if (d.follow.ground != -1 && o.interacts[d.follow.ground].y < d.y && !d.jumping) {
                    d.m[1] = 20;//16;
                    d.jumping = true;
                } else if (d.follow.ground != -1 && d.ground != -1 && o.interacts[d.follow.ground].y > d.y+16) {
                    d.nocollide.push(d.ground);
                }
            } else d.m[0] = 0;
                
            // Movement
            d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;
            algo.physics(dt, d, o);
            if (d.ground != -1) {
                d.jumping = false;
                d.nocollide.splice(1);
            }
            // Render
            let x = (Math.abs(d.m[0])>0.15?1+Math.floor(t/100)%2:0);
            if (d.animal == 0) o.sprites('Dog.png', [d.x, d.y], 
                [0, 0, x*32+3, 8, 26, 15, 1-d.fright]
            );
            else if (d.animal == 1) o.sprites('Cat (1).png', [d.x, d.y], 
                [0, 0, x*16, 0, 16, 16, 1-d.fright]
            );
        }
    },
    king: {
        default: {x:0, y:100,
            wing_angle: 0
        },
        update: (d, o, t, dt) => {
            d.wing_angle = Math.sin(t/150);
            o.sprites('Aswang King.png', [d.x, d.y],
                // Right wing
                [61, 1+Math.sin(t/200), 35, 0, 35, 18, 0, 0, -d.wing_angle, 0, 18],
                // Left wing
                [0, Math.sin(t/200), 0, 0, 35, 18, 0, 0, d.wing_angle, 35],
                // Left hand
                [1, 24+Math.sin(t/200)/2, 0, 18, 23, 21, 0, 0, 0],
                // Right hand
                [66, 24+Math.sin(t/200)/2, 23, 18, 23, 21],
                // Body
                [28, 13+Math.sin(t/200), 0, 39, 37, 52],
                // Head
                [41, 1+Math.sin(t/200)*2, 70, 0, 13, 18],
            )
        }
    },
    arrow: {
        default: {x:0, y:0, m:[0,0], a:0, nocollide:[], ground:-1, hitbox:[], parent:undefined, duration: 3000},
        update: (d, o, t, dt) => {
            if (d.duration <= 0) return;
            let col = algo.physics(dt, d, o);
            if (d.m[0]*d.m[0]+d.m[1]*d.m[1] > 1 && algo.rectint(d.hitbox, o.player.hitbox.splice(0,5)) && o.player.dead == -1) o.player.dead = 0;
            /*if (d.m[0]*d.m[0]+d.m[1]*d.m[1] > 1) col.forEach(c => {
                if (o.interacts[c[0]]['__type__'] == 'pinoy' && o.interacts[c[0]].dead == -1) o.interacts[c[0]].dead = 0;
            });*/
            if (d.ground == -1) d.a += (Math.atan2(d.m[1], -d.m[0])-d.a)*dt/200;
            else {
                d.m = [0, 0];
                d.duration -= dt;
            }


            o.sprites('Arrow.png', [d.x, d.y],
                [0, 0, 0, 0, 8, 5, 0, 0, d.a, 4, 3]
            );
            d.hitbox = [15,
                d.x, d.y,
                8, 5
            ];
            if (o.player && algo.rectint(d.hitbox, o.player.hitbox.slice(5))) d.duration = 0;
        },
        create: (o, arg) => {
            return {
                m: [5-10*Math.random(), 5-10*Math.random()],
                ...arg
            }
        }
    },
    plat: {
        default: {x:0, y:0, w:0, h:0, hitbox:[], dropoff:false, interact:true, col:1, mode:0, clip:undefined},
        update: (d, o, t, dt) => {
            let bs:number[][] = [];
            // [[x, y, x_offset_in_asset, y_offset_in_asset, asset_width, asset_height], ...]
            let spriteName = "";
            if (d.mode == 3) {
                spriteName = "Lava.png";
                for (let x = 0; x < d.w; x++) {
                    bs.push([x * 16, 0, 0, 0, 16, 16]);
                }
            } else {
                spriteName = "Blocks.png"
                for (let y = 0; y < d.h*2; y++) {
                    for (let x = 0; x < d.w*2; x++) {
                        let a = [
                            8*x, 8*y,
                            x == 0 ? 23 : x+1 == d.w*2 ? 31 : 27,
                            (y == 0 ? 22 : y+1 == d.h*2 ? 34 : 30)+[0,64,128][d.mode],
                            8, 8
                        ];
                        if (d.clip != undefined) {
                            if (y == 0 && d.clip[0].indexOf(x>>1) != -1) a[3] += 8;
                            if (x == 0 && d.clip[1].indexOf(y>>1) != -1) a[2] += 4;
                            if (x+1 == d.w*2 && d.clip[2].indexOf(y>>1) != -1) a[2] -= 4;
                            if (y+1 == d.h*2 && d.clip[3].indexOf(x>>1) != -1) a[3] -= 4;
                        }
                        bs.push(a);
                    }
                }
            }
            for (let x = 0; x < d.w; x++) {
                if (d.clip != undefined && d.clip[0].indexOf(x) != -1) continue;
                // Dead Tree (5%)
                if (d.data[x]&32) {
                    if (d.mode == 0) o.sprites('Treesv2.png', [d.x, d.y], [32*x, -64, 0, 64, 64, 64]);
                    //else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 96, 96, 32, 32]);
                    else if (d.mode == 2) o.sprites('Treesv2.png', [d.x, d.y], [32*x, -64, 64, 64, 64, 64]);
                }
                // Special (10%)
                if (d.data[x]&16) {
                    if (d.mode == 0) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 0, 0, 32, 32]);
                    else if (d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 0, 64, 32, 32]);
                    else if (d.mode == 2) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 32, 0, 32, 32]);
                }
                // Bush (10%)
                if (d.data[x]&8) {
                    if (d.mode == 0) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,0,0,32,32]);
                    else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 0, 128, 32, 32]);
                    else if(d.mode == 2) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,0,64,32,32]);
                }
                // Big grass (20%)
                if (d.data[x]&4) {
                    if (d.mode == 0) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,32,0,32,32]);
                    else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 32, 32, 32, 32]);
                    else if(d.mode == 2) o.sprites('Lagablab, bubble and random vegetation.png', [d.x, d.y], [32*x,-32,64,0,32,32]);
                }
                // Tree (10%)
                if (d.data[x]&2) {
                    if (d.mode == 0) o.sprites('Treesv2.png', [d.x, d.y], [32*x, -64, 64*(Math.floor(t/500)%2), 0, 64, 64]);
                    else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 96, 96, 32, 32]);
                    else if (d.mode == 2) o.sprites('Treesv2.png', [d.x, d.y], [32*x, -64, 128+64*(Math.floor(t/500)%2), 0, 64, 64]);
                }
                // Grass (50%)
                if (d.data[x]&1) {
                    if (d.mode == 0) o.sprites('Flowers.png', [d.x, d.y], [32*x,-32,0,0,32,32]);
                    else if(d.mode == 1) o.sprites('Bgitems.png', [d.x, d.y], [32*x, -32, 64, 32, 32, 32]);
                    //else if(d.mode == 2) 
                }
            }
            o.sprites(spriteName, [d.x, d.y], ...bs);
            d.hitbox = [ d.col,
                d.x, d.y,
                d.w*16, d.h*16
            ];
        },
        create: (o, arg) => {
            let w = arg.w || 0;
            let d:number[] = [];
            for (let i = 0; i < w>>1; i++) d.push(
                // Grass
                (Math.random() < 0.5 ? 1 : 0) +
                // Tree
                (Math.random() < 0.1 ? 2 : 0) +
                // Big Grass
                (Math.random() < 0.2 ? 4 : 0) +
                // Bush
                (Math.random() < 0.1 ? 8 : 0) +
                // Special
                (Math.random() < 0.1 ? 16: 0) +
                // Dead tree
                (Math.random() < 0.05? 32: 0)
            );
            return {
                data: d,
                ...arg
            }
        }
    },
    setting: {
        default: {seed:0, width: 0, data:[]},
        update: (d, o, t, dt) => {
            // Flowers
            for (let i = 0; i < d.data.length>>1; i++) {
                if (d.data[i] > 0.5)
                    o.sprites('Flowers.png', [32*i, 190],
                        [0,0,0,0,32,32]
                    );
            }
            // Objects
            for (let i = 0; i < d.data.length>>1; i++) {
                let p = d.data[i+(d.data.length>>1)];
                if (p > 0.5) {
                    let n = Math.floor(2*(p-0.5)*17);
                    o.sprites('Bgitems.png', [32*i+5-20*(p-0.5), 190+10*(p-0.5)],
                        [0,0,32*(n%4),32*Math.floor(n/4),32,32]
                    );
                }
            }
        },
        create: (o, arg) => {
            let seed = Number(new Date())
            let w = 20;
            return {
                seed: seed,
                data: algo.prng(seed, w*2, 0),
                width: w,
                ...arg
            }
        }
    },
    menu: {
        default: {},
        update: (d, o, t, dt) => {
            o.sprites('Rise_of_the_Aswang_King.png', [0, 0],
                [0, 0, 0, 0, 256, 144]
            )
        }
    },
    mananangal: {
        default: {x:0, y:0, t:0, m:[0,0], hitbox:[],
            follow:undefined,
            nogravity:true,
            nocollide:['plat'],
            chase: {
                type: 'pinoy',
                speed: 10,
                min: 4,
            },
            dead: -1,
            pn: 0,
            speed: 5,
            target: false,
            fright: true,
            nofollow: false
        },
        update: (d, o, t, dt) => {
            if (d.removed) return;

            // Dead
            if (d.dead != -1) {
                d.hitbox = [];
                d.dead += (1-d.dead)*dt/30;
                if (d.dead > 0.99) {
                    d.dead = -1;
                    d.removed = true;
                    return;
                }
            } else {
                d.hitbox = [0,
                    d.x, d.y+8,
                    32, 24,
                            0,
                    d.x+(d.fright?0:-64), d.y,
                    d.nofollow ? 0 : 64+32, 40
                ];
                algo.physics(dt, d, o);
                d.fright = d.m[0] > 0 ? true : d.m[0] < 0 ? false : d.fright;

                let center = false;
                // AI
                if (!d.target && d.p != undefined) {
                    let v = d.pn == 0 ? [Math.hypot(d.p[0]-d.x, d.p[1]-d.y), Math.atan2(d.y-d.p[1], d.p[0]-d.x)]
                                    : [Math.hypot(d.p[2]-d.x, d.p[3]-d.y), Math.atan2(d.y-d.p[3], d.p[2]-d.x)];
                    if (v[0] < 10) d.pn = 1-d.pn;
                    d.v = v;
                    d.m = [Math.cos(v[1])*d.speed/2, Math.sin(v[1])*d.speed/2];
                    if (algo.rectint(d.follow.hitbox, d.hitbox.slice(5))) d.target = true;
                    if (Math.abs(Math.cos(v[1])) < 0.2) center = true;
                    //o.sprites('Mananangalv3.png', [p[0], p[1]+Math.sin(t/200)*0.5], [0, 0, 0, 0, 32, 32, d.m[0] < 0]);
                } else if (d.follow != undefined) {
                    let h = Math.hypot(d.follow.x - d.x, d.follow.y - d.y);
                    let a = Math.atan2(d.y-d.follow.y, d.follow.x-d.x);
                    if (h > 20) d.m = [Math.cos(a)*d.speed, Math.sin(a)*d.speed];
                    else d.m = [0, 0];
                    if (Math.abs(d.follow.x - d.x) < 10) center = true;
                    
                    
                    //d.m = [(d.follow.x - d.x)/80, -(d.follow.y - d.y)/80];
                    //if (Math.hypot(d.follow.x - d.x, d.follow.y - d.y) < 30) d.t = 1;
                    //else d.t = 0;
                }
                
                let v = Math.min(Math.hypot(d.p[0]-d.x, d.p[1]-d.y), Math.hypot(d.p[2]-d.x, d.p[3]-d.y));
                if (v > 100 && (Math.min(d.p[0],d.p[2]) > d.x || Math.max(d.p[0],d.p[2]) < d.x)) {
                    d.target = false;
                    d.nofollow = true;
                } else if(v < 50) d.nofollow = false;
                //console.log(d.hitbox.slice(0,5),d.follow.hitbox.slice(5));
                if (algo.rectint(d.hitbox.slice(0,5),d.follow.hitbox.slice(5))) d.dead = 0;
            }
            
            let dd = d.dead == -1 ? 0 : Math.round(d.dead*2);
            let dr = d.dead == -1 ? 1 : 1-d.dead;
            let c = [
                // Body
                [0, 0, dd*32, 0, 32, 32, 1-d.fright],
                // Wing
                [0, 1, dd == 0 ? 32*3 : (dd-1)*32, dd == 0 ? 0 : 32, 32, 32, 1-d.fright, 0, dr*Math.sin(t/100)*0.5+(d.fright ? -0.5 : 0.5), d.fright ? 11 : 20, 19]
            ] ;
            let tng = Math.floor(d.t*4);
            if (tng > 0) c.push([d.m[0] < 0 ? -7 : 7, 8, Math.floor(t/100)%3*32, 32*3, 32, 32, 1-d.fright, 0, 0]);
            o.sprites('Mananangalv3.png', [d.x, d.y+Math.sin(t/200)*0.5*dr], ...c);
        }
    },
    shooter: {
        default: {x:0, y:0, f:0, a:0, shoot:0, cooldowntmp:0, cooldown: 1000, bind:[], speed:0, collide:[], s:10},
        update: (d, o, t, dt) => {
            let ofs = 0;
            if (d.shoot > 0) {
                d.cooldowntmp -= dt;
                //console.log(d.cooldowntmp);
                if (d.colldowntmp < 1000) ofs = 2;
                if (d.cooldowntmp <= 0) {
                    d.bind.push(o.entity('arrow', {x:d.x-Math.cos(d.a)*5, y:d.y+Math.sin(d.a)*5, m:[d.s*Math.cos(d.a),d.s*Math.sin(d.a)], parent:d, a:-d.a+Math.PI}));
                    d.shoot--;
                    d.cooldowntmp = d.cooldown;
                }
            }
            o.sprites('Shooterv2.png', [], [d.x-6, d.y-6, 32*ofs, 0, 13, 12, Math.PI/2 < d.a && d.a < 3*Math.PI/2 ? 1 : 0, 0, Math.PI/2 < d.a && d.a < 3*Math.PI/2 ? Math.PI-d.a : -d.a, 6, 6])
        }
    },
    vine: {
        default: {x:0, y:0, h:0},
        update: (d, o, t, dt) => {
            let a:number[][] = [];
            // x, y, x_offset_in_asset, y_offset_in_asset, asset_width, asset_height
            for(var i = 0; i < Math.floor(d.h/24); i++) a.push([0, 24*i, 0, 0, 7, 24]);
            if (d.h%24 != 0) a.push([0, 24*i, 0, 0, 7, d.h%24])
            a.push([2, d.h, 0, 32, 3, 3]);
            o.sprites('Vine.png', [d.x, d.y], ...a);
        }
    },
    wire: {
        default: {x:0, y:0, h:10, triggered: false,
            follow:undefined
        },
        update: (d, o, t, dt) => {
            d.hitbox = [0,
                d.x, d.y,
                4, 14+d.h
            ];
            if (d.follow == undefined) {
                o.interacts.forEach(e => {
                    if (e['__type__'] == 'pinoy') d.follow = e;
                });
            }
            let off:number = 0;
            if (d.follow != undefined && algo.rectint(d.hitbox, d.follow.hitbox)) {
                if (!d.triggered) d.bind.forEach(s => {
                    s.shoot = 1;
                    s.cooldown = 0;
                });
                d.triggered = true;
                off = 1;
            } else {
                d.triggered = false;
                off = 0;
            }
            let a:number[][] = [[0,0,0,0,3,7],[0,7+d.h,0,9,3,7]];
            for(var i = 0; i < Math.floor(d.h/16); i++) a.push([2,7+16*i,15,0,1,16]);
            if (d.h%16 != 0) a.push([2,7+16*i,15,0,1,d.h%16]);
            o.sprites('Tripwire2Correct.png', [d.x,d.y+off*10], ...a);
        }
    },
    pressure_plate: {
        default: {x:0, y:0, w:10, triggered: false},
        update: (d, o, t, dt) => {
            d.hitbox = [0,
                d.x, d.y,
                4+d.w, 2
            ];
            let a:number[][] = [[0,0,0,0,2,2],[2+d.w,0,2,0,2,2]];
            for(var i = 0; i < Math.floor(d.w/16); i++) a.push([2+16*i,0,0,2,16,2]);
            if (d.w%16 != 0) a.push([2+16*i,0,0,2,d.w%16,2]);
            if (o.player != undefined && algo.rectint(d.hitbox, o.player.hitbox)) {
                if (!d.triggered) d.bind.forEach(s => {
                    s.shoot = 1;
                    s.cooldown = 0;
                });
                d.triggered = true;
            } else d.triggered = false;
            o.sprites('pressure.png', [d.x,d.y], ...a);
        }
    },
    text: {
        default: {x: 10, y: 20, z:10, text:'', color: '#FFF'},
        update: (d, o, t, dt) => {
            o.btx.font = `${d.z*o.z}px arcade`;
            o.btx.fillText(d.text, d.x-o.camera[0], d.y-o.camera[1]);
        }
    }
};

export {entities, required_files};