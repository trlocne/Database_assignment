package hcmut.db.be.service;

import hcmut.db.be.entity.User;
import hcmut.db.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // xac dinh authority dua tren cac bang
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        if(user.getAdmin()!=null){
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }else if(user.getLearner()!=null){
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_LEARNER"));
        }else if(user.getTeacher()!=null){
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_TEACHER"));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorities);
    }
}
