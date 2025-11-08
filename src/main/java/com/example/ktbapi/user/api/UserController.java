package com.example.ktbapi.user.api;

import com.example.ktbapi.common.ApiResponse;
import com.example.ktbapi.common.dto.IdResponse;
import com.example.ktbapi.user.dto.SignupRequest;
import com.example.ktbapi.user.dto.ProfileUpdateRequest;
import com.example.ktbapi.user.dto.PasswordUpdateRequest;
import com.example.ktbapi.user.model.User;
import com.example.ktbapi.user.model.UserRole;
import com.example.ktbapi.user.repo.UserJpaRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Users", description = "회원 가입/조회/수정/삭제")
public class UserController {

    private final UserJpaRepository userRepo;

    public UserController(UserJpaRepository userRepo) {
        this.userRepo = userRepo;
    }

    /** ✅ 회원가입 */
    @PostMapping
    public ApiResponse<IdResponse> signup(@Valid @RequestBody SignupRequest req) {
        User user = new User(req.email, req.password, req.nickname, UserRole.USER);
        userRepo.save(user);
        return ApiResponse.success(new IdResponse(user.getId()));
    }

    /** ✅ 회원 단건 조회 */
    @GetMapping("/{userId}")
    public ApiResponse<User> getUser(@PathVariable Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return ApiResponse.success(user);
    }

    /** ✅ 프로필 수정 (닉네임, 프로필 이미지 등) */
    @PatchMapping("/{userId}/profile")
    public ApiResponse<Void> updateProfile(
            @PathVariable Long userId,
            @Valid @RequestBody ProfileUpdateRequest req) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 엔티티에 setter 또는 changeNickname, changeProfileImage 메서드가 있다고 가정
        user.changeNickname(req.nickname);
        if (req.profileImage != null) {
            user.setProfileImage(req.profileImage);
        }

        userRepo.save(user);
        return ApiResponse.success();
    }

    /** ✅ 비밀번호 변경 */
    @PatchMapping("/{userId}/password")
    public ApiResponse<Void> updatePassword(
            @PathVariable Long userId,
            @Valid @RequestBody PasswordUpdateRequest req) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 비밀번호 일치 여부 체크 (이전 비번 비교)
        if (!user.getPassword().equals(req.oldPassword)) {
            throw new IllegalArgumentException("Current password incorrect");
        }

        // 새 비밀번호로 변경
        user.changePassword(req.newPassword);
        userRepo.save(user);

        return ApiResponse.success();
    }
}
